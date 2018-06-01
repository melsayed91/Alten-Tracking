'use strict'

const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')
const cron = require('node-cron');
const express = require('express')
const serveStatic = require('serve-static')
const mediator = new EventEmitter()

console.log('--- Monitoring Service ---')
console.log('Connecting to monitoring repository...')


process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
    console.error('Unhandled Rejection', err)
})


mediator.on('db.ready', (client, db) => {
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
            let task = cron.schedule('* * * * *', function () {
                rep.generateSignals(rep.io)
                console.log('Generating New Signales at '+new Date().toISOString());
            }, false);
            task.start();
            app.on('close', () => {
                rep.disconnect(client)
                task.stop();
                task.destroy();
            })
        })
})

mediator.on('db.error', (err) => {
    console.error(err)
})

config.db.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')