'use strict'
const ObjectID = require('mongodb').ObjectID
const SIGNALS =
    {
        CONNECTED: 1,
        DISCONNECTED: 0
    }


const repository = (db) => {



    const getDriversVehicles = () => {
        const collection = db.collection('drivers')
        return new Promise((resolve, reject) => {
            const vehicles = []
            const projection = { _id: 1, vehicles: 1 }
            const query = {}
            const cursor = collection.find(query, projection)
            const addVehicle = (vehicle) => {
                vehicles.push(vehicle)
            }
            const sendVehicles = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching all drivers, err:' + err))
                }
                resolve(vehicles)
            }
            cursor.forEach(addVehicle, sendVehicles)
        })
    }

    const getVehiclesStatus =()=>{
        const signal = db.collection('signal')

        return new Promise((resolve, reject) => {
            const signals = []
            const query = {}
            const cursor = signal.find(query)
            const addSignal = (signal) => {
                signals.push(signal)
            }
            const sendSignals = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching all drivers, err:' + err))
                }
                resolve(signals)
            }
            cursor.forEach(addSignal, sendSignals)
        })
    }

    const generateSignals = (io) => {
        return new Promise((resolve, reject) => {
            getDriversVehicles().then(drivers => {
                const statuses = [SIGNALS.CONNECTED, SIGNALS.DISCONNECTED]
                let requests = []
                for (var driver of drivers) {
                    if (driver.vehicles) {
                        for (var vehicle of driver.vehicles) {

                            let signalObj = {
                                vehicleId: vehicle,
                                driverId: driver._id,
                                status: statuses[Math.floor(Math.random() * statuses.length)],
                                timestamp: new Date()
                            }
                            updateSignals(signalObj).then((resolve) => {
                                io.emit('signal', resolve)
                            }).catch(reject => {

                            })
                        }
                    }
                }
            }).catch(reject => {
                reject(new Error('An error occured fetching all drivers, err:' + err))
            })
        })
    }


    const updateSignals = (singalObj) => {
        const signal = db.collection('signal')
        const signalHistory = db.collection('signalHistory')

        return new Promise((resolve, reject) => {
            const filter = { vehicleId: singalObj.vehicleId }
            const options = { upsert: true }
            signal.update(filter, singalObj, options, (err, result) => {
                if (err) {
                    reject(new Error('An error occuered registring a user booking, err:' + err))
                } else {
                    signalHistory.insert(singalObj, (err, signalHistoryResult) => {
                        if (err) {
                            reject(new Error('An error occuered registring a user booking, err:' + err))
                        }
                        resolve(singalObj)
                    })
                }
            })
        })
    }

    const getRandom = (arr, n) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len;
        }
        return result;
    }


    const disconnect = (client) => {
        client.close()
    }

    return Object.create({
        generateSignals,
        getVehiclesStatus,
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