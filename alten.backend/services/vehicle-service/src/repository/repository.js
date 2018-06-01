'use strict'
const ObjectID = require('mongodb').ObjectID
const SIGNALS =
    {
        CONNECTED: 1,
        DISCONNECTED: 0
    }
const repository = (db) => {

    const collection = db.collection('vehicles')
    const signal = db.collection('signal')
    const getVehicles = () => {
        return new Promise((resolve, reject) => {
            const vehicles = []
            const query = {

            }
            const cursor = collection.find(query)
            const addVehicle = (vehicle) => {
                vehicles.push(vehicle)
            }
            const sendVehicles = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching all vehicles, err:' + err))
                }
                resolve(vehicles)
            }
            cursor.forEach(addVehicle, sendVehicles)
        })
    }
    const getVehiclesCount = () => {
        return new Promise((resolve, reject) => {

            const query = {}
            const sendCount = (err, count) => {
                if (err) {
                    reject(new Error('An error occured counting all vehicles, err:' + err))
                }
                resolve(count)
            }
            collection.count(query, sendCount)
        })
    }

    const getConnectedVehicles = () => {
        return new Promise((resolve, reject) => {

            const query = { status: SIGNALS.CONNECTED}
            const sendCount = (err, count) => {
                if (err) {
                    reject(new Error('An error occured counting connected vehicles, err:' + err))
                }
                resolve(count)
            }
            signal.count(query, sendCount)
        })
    }
    const getDisconnectedVehicles = () => {
        return new Promise((resolve, reject) => {

            const query = { status: SIGNALS.DISCONNECTED }
            const sendCount = (err, count) => {
                if (err) {
                    reject(new Error('An error occured counting disconnected vehicles, err:' + err))
                }
                resolve(count)
            }
            signal.count(query, sendCount)
        })
    }

    const geVehicleById = (id) => {
        return new Promise((resolve, reject) => {
            const projection = { _id: 1, name: 1, address: 1 }
            const sendVehicle = (err, vehicle) => {
                if (err) {
                    reject(new Error(`An error occured fetching a Vehicle with id: ${id}, err: ${err}`))
                }
                resolve(vehicle)
            }
            collection.findOne({ vin: id }, projection, sendVehicle)
        })
    }

    const disconnect = (client) => {
        client.close()
    }

    return Object.create({
        getVehicles,
        getVehiclesCount,
        geVehicleById,
        getConnectedVehicles,
        getDisconnectedVehicles,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if (!connection) {
            reject(new Error('connection db not supplied!'))
        }
        resolve(repository(connection))
    })
}

module.exports = Object.assign({}, { connect })