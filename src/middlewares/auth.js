const { JWT_ACCESS_KEYS } = process.env
const jwt = require("jsonwebtoken")
const wrapper = require("../utils/wrapper")
const client = require("../config/redis")

module.exports = {
	authentication: async (request, response, next) => {
		try {
			let token = request.headers.authorization

			if (!token) {
				return wrapper.response(response, 403, "Please Login First", null)
			}
			token = token.split(" ")[1]
			const checkBlacklistToken = await client.get(`accessToken:${token}`)
			if (checkBlacklistToken) {
				return wrapper.response(
					response,
					403,
					"Your token has been Destroyed, Please Login Again",
					null,
				)
			}
			jwt.verify(token, JWT_ACCESS_KEYS, (error, result) => {
				if (error) {
					return wrapper.response(response, 403, error.message, null)
				}
				const { role } = result
				request.decodeToken = request.user = {
					role,
				}
				next()
			})
		} catch (error) {
			console.log(error)
		}
	},
	authorization: async (request, response, next) => {
		try {
			const { role } = request.user
			if (role !== "admin") {
				return wrapper.response(response, 403, "Access Denied", null)
			}
			next()
		} catch (error) {
			console.log(error)
		}
	},
}
