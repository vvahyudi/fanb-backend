const bcrypt = require("bcrypt")
const client = require("../config/redis")
const wrapper = require("../utils/wrapper")
const userModel = require("../models/user")

module.exports = {
	createUser: async (request, response) => {
		try {
			const { username, password, status, role } = request.body
			const { filename, mimetype } = request.file
			const setData = {
				username,
				password,
				status,
				photos: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
				role: role ? role : "user",
			}
			const salt = bcrypt.genSaltSync(10)
			const hashedPassword = bcrypt.hashSync(setData.password, salt)
			setData.password = hashedPassword

			const result = await authModel.createUser(setData)
			return wrapper.response(response, 200, "Success Create User", result.data)
		} catch (error) {
			const {
				status = 500,
				statusText = "Internal Server Error",
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},
	getUserByUsername: async (request, response) => {
		try {
			const { username } = request.params
			const result = await authModel.getUserByUsername(username)
			if (result.length < 1) {
				return wrapper.response(response, 404, "Username not found", [])
			}
			return wrapper.response(
				response,
				200,
				"Success Get User By Username",
				result.data,
			)
		} catch (error) {
			const {
				status = 500,
				statusText = "Internal Server Error",
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},

	updateUserStatus: async (request, response) => {
		try {
			const { username } = request.params
			const { status } = request.body

			const checkUsername = await authModel.getUserByUsername(username)
			if (checkUsername.data.length < 1) {
				return wrapper.response(response, 404, "User Not Found", [])
			}
			const setData = {
				status,
			}
			await authModel.updateUserStatus(username, setData)
			return wrapper.response(
				response,
				result.status,
				`Success Update ${username} Status to ${setData}`,
				setData,
			)
		} catch (error) {
			const {
				status = 500,
				statusText = "Internal Server Error",
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},
}
