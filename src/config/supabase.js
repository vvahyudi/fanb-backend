const { SUPABASE_URL, SUPABASE_KEY } = process.env
const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase
