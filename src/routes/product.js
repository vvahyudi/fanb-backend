const express = require("express")
const Router = express.Router()
const productController = require("../controllers/product")
const authMiddleware = require("../middlewares/auth")
const uploadMiddleware = require("../middlewares/uploadFiles")

Router.get("/", productController.getAllProduct)
Router.get("/:id", productController.getProductById)
Router.post(
	"/",
	uploadMiddleware.uploadProduct,
	productController.createProduct,
)
Router.patch(
	"/:id",
	uploadMiddleware.uploadProduct,
	productController.updateProduct,
)

Router.delete("/:id", productController.deleteProduct)
module.exports = Router
