const express = require("express")
const Router = express.Router()
const transactionController = require("../controllers/transaction")

Router.get("/", transactionController.getAllTransaction)
Router.post("/", transactionController.createTransaction)
module.exports = Router
