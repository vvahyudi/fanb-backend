const express = require("express")
const Router = express.Router()
const userController = require("../controllers/user")
const authMiddleware = require("../middlewares/auth")
const uploadMiddleware = require("../middlewares/uploadFiles")

Router.get(
	"/:username",
	authMiddleware.authentication,
	userController.getUserByUsername,
)
Router.patch(
	"/:username",
	authMiddleware.authentication,
	userController.updateUserStatus,
)
Router.post("/register", uploadMiddleware.uploadUser, userController.createUser)

module.exports = Router
