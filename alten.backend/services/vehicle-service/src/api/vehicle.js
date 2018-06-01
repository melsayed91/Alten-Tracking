'use strict'

const status = require('http-status')

module.exports = (app, options) => {
    const { repo } = options
     /**
     * @api {get} /vehicles all vehicles
     * @apiGroup Vehicles
     * @apiSuccess {Object[]} vehicles Vehicles's list
     * @apiSuccess {String} vehicles._id Vehicle _id
     * @apiSuccess {String} vehicles.vin Vehicle vin
     * @apiSuccess {String} vehicles.regNo Vehicle regNo
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "_id" : "5a31919b94112a28acde2a1d",
     *       "vin" : "YS2R4X20005399401",
     *       "regNo" : "ABC123"
     *    }]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/vehicles', (req, res, next) => {
        repo.getVehicles().then(vehicles => {
            res.status(status.OK).json(vehicles)
        }).catch(next)
    })

     /**
     * @api {get} /vehicles/count count all vehicles
     * @apiGroup Vehicles
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    5
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */

    app.get('/vehicles/count', (req, res, next) => {
        repo.getVehiclesCount().then(count => {
            res.status(status.OK).json(count)
        }).catch(next)
    })


     /**
     * @api {get} /vehicles/count/connected count all connected vehicles
     * @apiGroup Vehicles
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    5
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/vehicles/count/connected', (req, res, next) => {
        repo.getConnectedVehicles().then(count => {
            res.status(status.OK).json(count)
        }).catch(next)
    })

     /**
     * @api {get} /vehicles/count/disconnected count all disconnected vehicles
     * @apiGroup Vehicles
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    5
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/vehicles/count/disconnected', (req, res, next) => {
        repo.getDisconnectedVehicles().then(count => {
            res.status(status.OK).json(count)
        }).catch(next)
    })
     /**
     * @api {get} /vehicles/{id} get vehicle details by id
     * @apiGroup Vehicles
     * @apiSuccess {Object} vehicle
     * @apiSuccess {String} vehicles._id Vehicle _id
     * @apiSuccess {String} vehicles.vin Vehicle vin
     * @apiSuccess {String} vehicles.regNo Vehicle regNo
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *     {
     *      "_id" : "5a31919b94112a28acde2a1d",
     *       "vin" : "YS2R4X20005399401",
     *       "regNo" : "ABC123"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/vehicles/:id', (req, res, next) => {
        repo.geVehicleById(req.params.id).then(vehicle => {
            res.status(status.OK).json(vehicle)
        }).catch(next)
    })
}