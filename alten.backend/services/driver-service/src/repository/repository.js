'use strict'
const ObjectID = require('mongodb').ObjectID

const repository = (db) => {


    const getDrivers = () => {
        const collection = db.collection('drivers')

        return new Promise((resolve, reject) => {
            const drivers = []
            const match = {
                $match: {}
            }
            const project = {
                $project: {}
            }

            const unwindVehicles = { $unwind: '$vehicles' }
            const lookup = {
                $lookup:
                    {
                        from: "vehicles",
                        localField: "vehicles",
                        foreignField: "_id",
                        as: "driver_vehicle"
                    }
            }
            const matchLookup = {
                $match: { "driver_vehicle": { $ne: [] } }
            }
            const unwindDriverVehicle = { $unwind: '$driver_vehicle' }
           

            const groupBy = {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    address: { $first: "$address" },
                    city: { $first: "$city" },
                    vehicles: { "$push": "$driver_vehicle" }
                }
            }

            const cursor = collection.aggregate([unwindVehicles, lookup, matchLookup, unwindDriverVehicle, groupBy])
            const addDriver = (driver) => {
                drivers.push(driver)
            }
            const sendDrivers = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching all drivers, err:' + err))
                }
                resolve(drivers)
            }
            cursor.forEach(addDriver, sendDrivers)
        })
    }

    const getDriversCount = () => {
        const collection = db.collection('drivers')

        return new Promise((resolve, reject) => {

            const query = {}
            const sendCount = (err, count) => {
                if (err) {
                    reject(new Error('An error occured counting all drivers, err:' + err))
                }
                resolve(count)
            }
            collection.count(query, sendCount)
        })
    }

    const geDriverById = (id) => {
        const collection = db.collection('drivers')

        return new Promise((resolve, reject) => {
            const projection = { _id: 1, name: 1, address: 1 }
            const sendDriver = (err, driver) => {
                if (err) {
                    reject(new Error(`An error occured fetching a driver with id: ${id}, err: ${err}`))
                }
                resolve(driver)
            }
            collection.findOne({ _id: ObjectID(id) }, projection, sendDriver)
        })
    }

    const disconnect = (client) => {
        client.close()
    }

    return Object.create({
        getDrivers,
        geDriverById,
        getDriversCount,
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