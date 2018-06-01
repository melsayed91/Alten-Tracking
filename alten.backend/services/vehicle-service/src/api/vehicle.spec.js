/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const should = require('should')
describe('Vehicles API', () => {
    let app = null
    let testVehicles = [{
        _id: "3",
        vin: "YS2R4X20005388011",
        regNo: "JKL012",
        model: 1,
        make: 1
    }, {
        _id: "2",
        vin: "YS2R4X20005387949",
        regNo: "MNO345",
        model: 1,
        make: 2
    }, {
        _id: "1",
        vin: "YS2R4X20005399401",
        regNo: "ABC123",
        model: 1,
        make: 3
    }]

    let testRepo = {
        getVehicles() {
            return Promise.resolve(testVehicles)
        },
        geVehicleById(id) {
            return Promise.resolve(testVehicles.find(vehicle => vehicle.vin === id))
        }
    }

    beforeEach(() => {
        return server.start({
            port: 3001,
            repo: testRepo
        }).then(serv => {
            app = serv
        })
    })

    afterEach(() => {
        app.close()
        app = null
    })

    it('can return all vehicles', (done) => {
        request(app)
            .get('/vehicles')
            .expect((res) => {
                res.body.should.containEql({
                    _id: "3",
                    vin: "YS2R4X20005388011",
                    regNo: "JKL012",
                    model: 1,
                    make: 1
                })
            })
            .expect(200, done)
    })

    it('returns 200 for an known vehicle', (done) => {
        request(app)
            .get('/vehicles/YS2R4X20005399401')
            .expect((res) => {
                res.body.should.containEql({
                    _id: "1",
                    vin: "YS2R4X20005399401",
                    regNo: "ABC123",
                    model: 1,
                    make: 3
                })
            })
            .expect(200, done)
    })
})