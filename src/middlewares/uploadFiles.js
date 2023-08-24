const multer = require("multer")
const wrapper = require("../utils/wrapper")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")

module.exports = {
	uploadUser: (request, response, next) => {
		const storage = new CloudinaryStorage({
			cloudinary,
			params: {
				folder: "fandbcashier/users",
			},
		})
		const upload = multer({ storage }).single("photos")
		upload(request, response, (error) => {
			if (error) {
				if (error instanceof multer.MulterError) {
					return wrapper.response(response, 401, error.message, null)
				} else {
					return wrapper.response(response, 401, error.message, null)
				}
			}
			next()
		})
	},
	uploadProduct: (request, response, next) => {
		const storage = new CloudinaryStorage({
			cloudinary,
			params: {
				folder: "fandbcashier/products",
			},
		})
		const upload = multer({ storage }).single("picture")
		upload(request, response, (error) => {
			if (error) {
				if (error instanceof multer.MulterError) {
					return wrapper.response(response, 401, error.message, null)
				} else {
					return wrapper.response(response, 401, error.message, null)
				}
			}
			next()
		})
	},
}
