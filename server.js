const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var favicon = require('serve-favicon')
var path = require('path')

app.prepare()
  .then(() => {
    const server = express()
    server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))
    server.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.header('Access-Control-Allow-Credentials', 'true')
      next()
    })

    server.get('*', (req, res) => {
      handle(req, res).catch(err => {
        next(err)
      })
      return handle(req, res)
    })

    server.listen(3001, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3001')
    })
  })
