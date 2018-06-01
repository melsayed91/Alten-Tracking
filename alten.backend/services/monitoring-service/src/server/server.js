'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const monitoringAPI = require('../api/monitoring')
const bodyParser = require('body-parser')


const start = (options) => {

    return new Promise((resolve, reject) => {
        if (!options.repo) {
            reject(new Error('The server must be started with a connected repository'))
        }

        if (!options.port) {
            reject(new Error('The server must be started with an available port'))
        }

        const app = express()
        const http = require('http').createServer(app);
        const io = require('socket.io')(http)
        app.use(morgan('dev'))
        app.use(helmet())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(500).send('Something went wrong!')
        })
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        options.repo.io = io;
        monitoringAPI(app, options)
        const server = http.listen(options.port, () => resolve(app))
        io.on('connection', (socket) => {
            console.log('user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
            socket.on('add-message', (message) => {
                io.emit('message', { type: 'new-message', text: message });
            });

        });

    })
}

module.exports = Object.assign({}, { start })