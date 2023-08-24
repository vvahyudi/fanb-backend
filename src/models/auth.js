const supabase = require("../config/supabase")

module.exports = {
	createUser: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("users")
				.insert(data)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getUserByUsername: (username) =>
		new Promise((resolve, reject) => {
			supabase
				.from("users")
				.select("*")
				.eq("username", username)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	updateUserStatus: (status, data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("users")
				.update(data)
				.eq("status", status)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),

	// login: async (request, response) => {
	// 	try {
	// 		const { username, password } = request.body
	// 	} catch (error) {}
	// },

	// logout: async (request, response) =>{
	//     try {
	//         let token = request.headers.authorization
	//         token = token.split(" ")[1]
	//     } catch (error) {

	//     }
	// }
}
