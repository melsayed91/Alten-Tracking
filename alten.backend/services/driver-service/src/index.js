'use strict'

const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')
const mediator = new EventEmitter()
const express = require('express')
const serveStatic = require('serve-static')
console.log('--- Drivers Service ---')
console.log('Connecting to drivers repository...')


process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
})


mediator.on('db.ready', (client,db) => {
    let rep
    repository.connect(db)
        .then(repo => {
            console.log('Repository Connected. Starting Server')
            rep = repo
            return server.start({
                port: config.serverSettings.port,
                repo
            })
        })
        .then(app => {
            app.use('/apidoc', express.static(__dirname + '/doc'));
            app.use(serveStatic('../doc', { 'index': ['index.html'] }))
            console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
            app.on('close', () => {
                rep.disconnect(client)
            })
        })
})

mediator.on('db.error', (err) => {
    console.error(err)
})

config.db.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')