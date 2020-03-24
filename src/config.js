require('dotenv').config()
const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost',
  cors: process.env.CORS
}

module.exports = config
