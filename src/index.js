const express = require('express')
const app = express()
const config = require('./config')

// middlewares
app.use(express.json())

// Rutas
const userRoutes = require('./routes/users')

// instanciar rutas
userRoutes(app)

app.listen(config.port, () => {
  console.log(`App listening on port ${config.host}:${config.port}`)
})
