const redis = require("redis")
require("dotenv").config
const { REDIS_HOST, REDIS_USER, REDIS_PASSWORD, REDIS_PORT } = process.env

const client = redis.createClient({
	url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
})
;(async () => {
	client.on("connect", () => {
		console.log("Redis Client Connected")
	})
	client.on("error", (error) => {
		console.error(error.message)
	})
	await client.connect()
})()

module.exports = client
