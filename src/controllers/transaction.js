const transactionModel = require("../models/transaction")
const wrapper = require("../utils/wrapper")

module.exports = {
	getAllTransaction: async (request, response) => {
		try {
			let { page, limit, sort, search } = request.body
			page = +page
			limit = +limit
			const totalData = await transactionModel.getCountTransaction()
			const totalPage = Math.ceil(totalData / limit)
			const pagination = {
				page,
				limit,
				totalPage,
				totalData,
			}
			const offset = (page - 1) * limit
			let sortColumn = "id"
			let sortType = "asc"
			if (sort) {
				sortColumn = sort.split(".")[0]
				sortType = sort.split(".")[1]
			}

			sortType = sortType.toLowerCase() === "asc"

			const result = await transactionModel.getAllTransanction(
				offset,
				limit,
				sortColumn,
				search,
				sortType,
			)
			return wrapper.response(
				response,
				200,
				"Success Get All Transaction",
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
	createTransaction: async (request, response) => {
		try {
			const { total } = request.body
			const setData = {
				total: total ? total : 0,
			}
			const result = await transactionModel.createTransaction(setData)

			return wrapper.response(
				response,
				200,
				"Success Create Transaction",
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
}
