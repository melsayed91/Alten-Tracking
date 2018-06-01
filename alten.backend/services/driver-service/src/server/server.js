'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const driverAPI = require('../api/driver')



const start = (options) => {

    return new Promise((resolve, reject) => {
        if (!options.repo) {
            reject(new Error('The server must be started with a connected repository'))
        }

        if (!options.port) {
            reject(new Error('The server must be started with an available port'))
        }

        const app = express()
        app.use(morgan('dev'))
        app.use(helmet())
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(500).send('Something went wrong!')
        })
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        
       
        
        driverAPI(app, options)
        const server = app.listen(options.port, () => resolve(app))
    })
}

module.exports = Object.assign({}, { start })