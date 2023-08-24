const { JWT_ACCESS_KEYS, JWT_REFRESH_KEYS } = process.env
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const client = require("../config/redis")
const authModel = require("../models/auth")
const wrapper = require("../utils/wrapper")

module.exports = {
	login: async (request, response) => {
		try {
			const { username, password } = request.body
			const checkUser = await authModel.getUserByUsername(username)
			if (checkUser.length < 1) {
				return wrapper.response(response, 404, "Username not Registered", null)
			}
			const matchPassword = bcrypt.compareSync(
				password,
				checkUser.data[0].password,
			)
			if (!matchPassword) {
				return wrapper.response(response, 401, "Wrong Password", null)
			}

			const payload = {
				id: checkUser.data[0].id,
				role: !checkUser.data[0].role ? "user" : checkUser.data[0].role,
			}
			delete payload.password
			const token = jwt.sign(payload, JWT_ACCESS_KEYS, { expiresIn: "300s" })
			console.log(token)
			const refreshToken = jwt.sign(payload, JWT_REFRESH_KEYS, {
				expiresIn: "600s",
			})

			return wrapper.response(response, 200, "Login Successfull", {
				id: payload.id,
				token,
				refreshToken,
			})
		} catch (error) {
			const {
				status = 500,
				statusText = error.message,
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},
	logout: async (request, response) => {
		try {
			let token = request.headers.authorization
			token = token.split(" ")[1]

			client.setEx(`accessToken:${token}`, 3600 * 48, token)
			return wrapper.response(response, 200, "Logout Successfull", null)
		} catch (error) {
			const {
				status = 500,
				statusText = error.message,
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},
	refresh: async (request, response) => {
		try {
			const { refreshToken } = request.headers
			if (!refreshToken) {
				return wrapper.response(response, 400, "Refresh Token Required", null)
			}
			const checkBlacklistToken = await client.get(
				`refreshToken:${refreshToken}`,
			)
			if (checkBlacklistToken) {
				return wrapper.response(
					response,
					403,
					"Your token has been Destroyed please re-login",
					null,
				)
			}
			console.log(refreshToken)
			let token, payload, newRefreshToken
			jwt.verify(refreshToken, JWT_REFRESH_KEYS, (error, result) => {
				if (error) {
					return wrapper.response(response, 401, "Invalid Token", null)
				}
				payload = {
					id: result.id,
					role: !result.role ? "user" : result.role,
				}
				token = jwt.sign(payload, JWT_ACCESS_KEYS, { expiresIn: "60s" })
				newRefreshToken = jwt.sign(payload, JWT_REFRESH_KEYS, {
					expiresIn: "2h",
				})
				client.setEx(`refreshToken:${refreshToken}`, 3600 * 2, refreshToken)
				console.table({ token, newRefreshToken })
			})
			return wrapper.response(response, 200, "Success Refresh Token", {
				id: payload.id,
				token,
				refreshToken: newRefreshToken,
			})
		} catch (error) {
			const {
				status = 500,
				statusText = error.message,
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},
}
