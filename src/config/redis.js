const redis = require("redis")
const { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD } = process.env

const client = redis.createClient({
	url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
})

/* This is an immediately invoked async function expression (IIFE) that connects to a Redis server
using the `redis` package. */
;(async () => {
	client.on("connect", () => {
		console.log("Redis Connected")
	})
	client.on("error", (err) => {
		console.error(err)
	})
	await client.connect()
})()

module.exports = client
