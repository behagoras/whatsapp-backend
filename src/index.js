const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// middlewares
app.use(bodyParser())

// Rutas
const userRoutes = require('./routes/users')

// instanciar rutas
userRoutes(app)
bodyParser(app)

app.listen(3000, () => {
  console.log('app listening on port http://localhost:3000')
})
