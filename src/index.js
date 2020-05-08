const express = require('express')
const app = express()
const config = require('./config').config
const cors = require('cors')

const socket = require('socket.io')

app.use(cors())

// middlewares
app.use(express.json())

// Rutas
const userRoutes = require('./routes/users')
const clientsRoutes = require('./routes/clients')

// instanciar rutas
userRoutes(app)
clientsRoutes(app)

const server = app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`)
})

const io = socket(server)
app.io = io

// io.on('connection', (socket) => {
//   console.log('Client connected to socket with id', socket.id)

//   socket.on('chat', (data) => {
//     console.log(data)
//   })
//   io.sockets.emit('sendBulkMessages', { to: 1, minutes: 0.5 })

//   // console.log(socket)
// })
