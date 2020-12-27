const express = require('express')
const ClientsService = require('../services/clients')

async function clientsApi (app) {
  const clientsService = new ClientsService()
  const router = express.Router()
  // Initialize router in /api/users
  app.use('/api/clients', router)

  // routes
  router.get('/', async (req, res, next) => {
    // http://localhost:3000/api/clients?page=2&limit=100

    const page = req.query.page ? parseInt(req.query.page) : 1
    const limit = req.query.limit ? parseInt(req.query.limit) : 20
    const start = (page - 1) * limit
    // const end = page * limit
    const clients = await clientsService.getClients({ page, limit })

    const results = {}
    results.results = clients
    // results.results = clients.slice(start, end)
    // results.length = results.results.length

    console.log('clients.length', clients.length)

    console.log('req.baseUrl', req.baseUrl)
    console.log("req.get('host')", req.get('host'))

    const host = req.get('host')
    const { baseUrl } = req

    // if (end < clients.length) {
    results.next = {
      page: `${host}${baseUrl}/?page=${page + 1}&limit=${limit}`,
      limit
    }
    // }

    if (start > 0) {
      results.previous = {
        page: `${host}${baseUrl}/?page=${page - 1}&limit=${limit}`,
        limit
      }
    }

    res.status(200).json(results)
  })

  router.get('/send/:to/:minutes', async (req, res, next) => {
    const { io } = app

    const to = req.params.to || 1
    const minutes = req.params.minutes || 1

    io.on('connection', (socket) => {
      console.log('Client connected to socket with id', socket.id)

      socket.on('chat', (data) => {
        console.log(data)
      })
      // console.log(socket)
    })
    io.sockets.emit('sendBulkMessages', { to, minutes })
    res.json({
      to,
      minutes
    //  io
    })
  })

  router.post('/send', async (req, res, next) => {
    const { io } = app

    const {
      to = 0,
      minutes = 1,
      message: messageArray,
      campaign
    } = req.body
    console.log('file: clients.js ~ line 81 ~ router.post ~ req.body', req.body)
    const message = messageArray.reduce((accumulator, currentValue) => accumulator + '\n\n' + currentValue)
    io.on('connection', (socket) => {
      console.log('Client connected to socket with id', socket.id)

      socket.on('chat', (data) => {
        console.log(data)
      })
    })
    io.sockets.emit('sendBulkMessages', { to, minutes, message, campaign })
    res.json({
      to,
      minutes,
      message,
      campaign
    })
  })

  router.get('/:client', async (req, res, next) => {
    const { data } = req.body
    res.json({
      Message: 'It works',
      data,
      client: req.params.client,
      code: '200'
    })
  })
}

module.exports = clientsApi
