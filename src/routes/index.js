const express = require("express")
const Router = express.Router()

const authRoutes = require("./auth")
const productRoutes = require("./product")
const transactionRoutes = require("./transaction")
const userRoutes = require("./user")

Router.use("/auth", authRoutes)
Router.use("/product", productRoutes)
Router.use("/transaction", transactionRoutes)
Router.use("/user", userRoutes)

Router.get("/", (_, response) => {
	response.json({ message: "Welcome" })
})

module.exports = Router
