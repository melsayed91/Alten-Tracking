'use strict'

const status = require('http-status')

module.exports = (app, options) => {
    const { repo } = options
    /**
     * @api {get} /drivers all drivers
     * @apiGroup Drivers
     * @apiSuccess {Object[]} drivers Driver's list
     * @apiSuccess {String} drivers._id Driver _id
     * @apiSuccess {String} drivers.name Driver name
     * @apiSuccess {String} drivers.address Driver address
     * @apiSuccess {String} drivers.city Driver city
     * @apiSuccess {String[]} drivers.vehicles Driver vehicles
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "_id" : "5a31925294112a28acde2a24",
     *       "name" : "Kalles Grustransporter AB",
     *       "address" : "Cementvägen 8, 111 11",
     *       "city" : "Södertälje",
     *        "vehicles" : [
     *              "5a31919b94112a28acde2a1d",
     *              "5a3191b294112a28acde2a1e",
     *              "5a3191c494112a28acde2a1f"
     *          ]
     *    }]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/drivers', (req, res, next) => {
        repo.getDrivers().then(drivers => {
            res.status(status.OK).json(drivers)
        }).catch(next)
    })

     /**
     * @api {get} /drivers/count count all drivers
     * @apiGroup Drivers
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    5
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/drivers/count', (req, res, next) => {
        repo.getDriversCount().then(count => {
            res.status(status.OK).json(count)
        }).catch(next)
    })
    /**
     * @api {get} /drivers/{id} get driver details by id
     * @apiGroup Drivers
     * @apiSuccess {Object} driver Driver's Object
     * @apiSuccess {String} drivers._id Driver _id
     * @apiSuccess {String} drivers.name Driver name
     * @apiSuccess {String} drivers.address Driver address
     * @apiSuccess {String} drivers.city Driver city
     * @apiSuccess {String[]} drivers.vehicles Driver vehicles
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "_id" : "5a31925294112a28acde2a24",
     *       "name" : "Kalles Grustransporter AB",
     *       "address" : "Cementvägen 8, 111 11",
     *       "city" : "Södertälje",
     *        "vehicles" : [
     *              "5a31919b94112a28acde2a1d",
     *              "5a3191b294112a28acde2a1e",
     *              "5a3191c494112a28acde2a1f"
     *          ]
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/drivers/:id', (req, res, next) => {
        repo.geDriverById(req.params.id).then(driver => {
            res.status(status.OK).json(driver)
        }).catch(next)
    })
}