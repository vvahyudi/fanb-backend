const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
	process.env
const cloudinary = require("cloudinary").v2

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
	console.error(
		"Missing Cloudinary configuration. Please check your environment variables.",
	)
	process.exit(1) // Exit the process or handle the error accordingly
}

try {
	cloudinary.config({
		cloud_name: CLOUDINARY_CLOUD_NAME,
		api_key: CLOUDINARY_API_KEY,
		api_secret: CLOUDINARY_API_SECRET,
		secure: true,
	})

	module.exports = cloudinary
} catch (error) {
	console.error("Error configuring Cloudinary:", error)
	process.exit(1) // Exit the process or handle the error accordingly
}
