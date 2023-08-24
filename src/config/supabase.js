const { SUPABASE_URL, SUPABASE_KEY } = process.env
const { createClient } = require("@supabase/supabase-js")
const option = {
	auth: {
		persistSession: false,
	},
}
const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_KEY

const supabase = createClient(supabaseUrl, supabaseKey, option)

module.exports = supabase
