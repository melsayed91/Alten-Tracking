'use strict'

const status = require('http-status')

module.exports = (app, options) => {
  const { repo } = options

     /**
     * @api {get} /monitor/status get all vehicles status
     * @apiGroup Monitor
     * @apiSuccess {Object[]} signals Signals's list
     * @apiSuccess {String} signals._id Signal _id
     * @apiSuccess {String} signals.vehicleId Signal vehicleId
     * @apiSuccess {String} signals.driverId Signal driverId
     * @apiSuccess {Number} signals.status Signal status
     * @apiSuccess {Date} signals.timestamp Signal timestamp
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [{
     *      "_id" : "5a35bca4fb0703cea434949b",
     *       "vehicleId" : "5a31919b94112a28acde2a1d",
     *       "driverId" : "5a31925294112a28acde2a24",
     *       "status" : 1,
     *       "timestamp" : "2017-12-19T20:29:00.516+0000"
     *    }]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     */
    app.get('/monitor/status', (req, res, next) => {
      repo.getVehiclesStatus().then(signals => {
        res.status(status.OK).json(signals)
        }).catch(next)
    })
}