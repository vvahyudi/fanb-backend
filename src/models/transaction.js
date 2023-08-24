const { reject } = require("bcrypt/promises")
const supabase = require("../config/supabase")

module.exports = {
	getCountTransaction: () =>
		new Promise((resolve, reject) => {
			supabase
				.from("transactions")
				.select("*", { count: "exact" })
				.then((result) => {
					if (!result.error) {
						resolve(result.count)
					} else {
						reject(result)
					}
				})
		}),

	getAllTransanction: (offset, limit, sortColumn, search, sortType) =>
		new Promise((resolve, reject) => {
			supabase
				.from("transactions")
				.select("*")
				.range(offset, offset + limit - 1)
				.order(sortColumn, { ascending: sortType })
				.ilike("id", `%${search}$`)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	createTransaction: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("transactions")
				.insert(data)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
