const productModel = require("../models/product")
const wrapper = require("../utils/wrapper")

module.exports = {
	getAllProduct: async (request, response) => {
		try {
			let { page, limit, sort, search, searchDateCreated } = request.query
			page = +page
			limit = +limit
			const totalData = await productModel.getCountProduct()
			const totalPage = Math.ceil(totalData / limit)
			const pagination = {
				page,
				limit,
				totalPage,
				totalData,
			}
			const offset = (page - 1) * limit
			let sortColumn = "name"
			let sortType = "asc"
			if (sort) {
				sortColumn = sort.split(".")[0]
				sortType = sort.split(".")[1]
			}
			if (sortType.toLowerCase() === "asc") {
				sortType = true
			} else {
				sortType = false
			}

			let day
			let nextDay
			if (searchDateCreated) {
				day = new Date(searchDateCreated)
				nextDay = new Date(new Date(day).setDate(day.getDate() + 1))
			}
			const result = await productModel.getAllProduct(
				offset,
				limit,
				sortColumn,
				search,
				sortType,
				day,
				nextDay,
			)
			console.log(result)
			return wrapper.response(
				response,
				200,
				"Success Get All Product",
				result.data,
				pagination,
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
	getProductById: async (request, response) => {
		try {
			const { id } = request.params
			const result = await productModel.getProductById(id)
			console.log(result)
			if (result.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data with Id ${id} Not Found`,
					result.data,
				)
			}
			console.log(result.data[0])
			return wrapper.response(
				response,
				200,
				"Success Get Product By Id",
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
	createProduct: async (request, response) => {
		try {
			const { name, category, price } = request.body
			const { filename, mimetype } = request.file
			const setData = {
				name,
				category: category ? category : "main course",
				price: price ? price : 0,
				picture: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
			}
			await productModel.createProduct(setData)
			return wrapper.response(response, 200, "Success Create Product", setData)
		} catch (error) {
			const {
				status = 500,
				statusText = "Internal Server Error",
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},
	updateProduct: async (request, response) => {
		try {
			console.log(request.params)
			console.log(request.body)
			const { id } = request.params
			const { name, category, price } = request.body
			const { filename, mimetype } = request.file

			const checkId = await productModel.getProductById(id)
			if (checkId.data.length < 1) {
				return wrapper.response(response, 404, `Data With ${id} Not Found`, [])
			}
			const setData = {
				name,
				category: category ? category : "main course",
				price: price ? price : 0,
				picture: filename ? `${filename}.${mimetype.split("/")[1]}` : "",
			}
			await productModel.updateProduct(id, setData)

			return wrapper.response(response, 200, "Success Update Product", setData)
		} catch (error) {
			const {
				status = 500,
				statusText = "Internal Server Error",
				error: errorData = null,
			} = error
			return wrapper.response(response, status, statusText, errorData)
		}
	},
	deleteProduct: async (request, response) => {
		try {
			const { id } = request.params
			const checkId = await productModel.getProductById(id)
			if (checkId.data.length < 1) {
				return wrapper.response(
					response,
					404,
					`Data With Id ${id} Not Found`,
					[],
				)
			}
			await productModel.deleteProduct(id)
			return wrapper.response(
				response,
				200,
				`Success Delete Product With Id: ${id}`,
				id,
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
