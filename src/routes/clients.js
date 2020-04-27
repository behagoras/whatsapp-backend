const express = require('express')
const ClientsService = require('../services/clients')

async function clientsApi (app) {
  const clientsService = new ClientsService()
  const router = express.Router()
  // Initialize router in /api/users
  app.use('/api/clients', router)

  // routes
  router.get('/', async (req, res, next) => {
    const clients = await clientsService.getClients()
    res.json({
      code: '200',
      data: clients
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

  router.post('/', async (req, res, next) => {
    res.json({
      Message: 'It works',
      user: req.body.user,
      code: '200'
    })
  })
}

module.exports = clientsApi
