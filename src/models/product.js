const supabase = require("../config/supabase")

module.exports = {
	getCountProduct: () =>
		new Promise((resolve, reject) => {
			supabase
				.from("products")
				.select("*", { count: "exact" })
				.then((result) => {
					if (!result.error) {
						resolve(result.count)
					} else {
						reject(result)
					}
				})
		}),
	getAllProduct: (offset, limit, sortColumn, search, sortType, day, nextDay) =>
		new Promise((resolve, reject) => {
			supabase
				.from("products")
				.select("*")
				.range(offset, offset + limit - 1)
				.order(sortColumn, { ascending: sortType })
				.ilike("name", `%${search}%`)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	getProductById: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("products")
				.select("*")
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	createProduct: (data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("products")
				.insert(data)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	updateProduct: (id, data) =>
		new Promise((resolve, reject) => {
			supabase
				.from("products")
				.update(data)
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
	deleteProduct: (id) =>
		new Promise((resolve, reject) => {
			supabase
				.from("products")
				.delete()
				.eq("id", id)
				.then((result) => {
					if (!result.error) {
						resolve(result)
					} else {
						reject(result)
					}
				})
		}),
}
