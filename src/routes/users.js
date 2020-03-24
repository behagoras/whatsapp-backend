const express = require('express')

function propertiesApi (app) {
  const router = express.Router()
  // Initialize router in /api/users
  app.use('/api/users', router)

  // routes
  router.get('/', async (req, res, next) => {
    res.json({
      data: 'It works',
      code: '200'
    })
  })
  router.get('/:user', async (req, res, next) => {
    const { data } = req.body
    res.json({
      Message: 'It works',
      data,
      user: req.params.user,
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

module.exports = propertiesApi
