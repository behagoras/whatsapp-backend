const express = require('express')
const app = express()
const config = require('./config').config
const cors = require('cors')

app.use(cors())

// middlewares
app.use(express.json())

// Rutas
const userRoutes = require('./routes/users')
const clientsRoutes = require('./routes/clients')

// instanciar rutas
userRoutes(app)
clientsRoutes(app)

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`)
})
