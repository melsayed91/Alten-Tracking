/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')
const should = require('should')
describe('Drivers API', () => {
    let app = null
    let testDrivers = [{
        _id: "3",
        name: "John",
        address: "Dubai",
        mobile: "0525358638",
        city: "Dubai",
        licenseNo: 12345
    }, {
        _id: "2",
        name: "Ahmed",
        address: "Dubai",
        mobile: "0525358638",
        city: "Dubai",
        licenseNo: 1230
    }, {
        _id: "1",
        name: "Mohamed",
        address: "Dubai",
        mobile: "0525358638",
        city: "Dubai",
        licenseNo: 1234
    }]

    let testRepo = {
        getDrivers() {
            return Promise.resolve(testDrivers)
        },
        geDriverById(id) {
            return Promise.resolve(testDrivers.find(driver => driver._id === id))
        }
    }

    beforeEach(() => {
        return server.start({
            port: 3000,
            repo: testRepo
        }).then(serv => {
            app = serv
        })
    })

    afterEach(() => {
        app.close()
        app = null
    })

    it('can return all drivers', (done) => {
        request(app)
            .get('/drivers')
            .expect((res) => {
                res.body.should.containEql({
                    _id: "1",
                    name: "Mohamed",
                    address: "Dubai",
                    mobile: "0525358638",
                    city: "Dubai",
                    licenseNo: 1234
                })
            })
            .expect(200, done)
    })

    it('returns 200 for an known driver', (done) => {
        request(app)
            .get('/drivers/1')
            .expect((res) => {
                res.body.should.containEql({
                    _id: "1",
                    name: "Mohamed",
                    address: "Dubai",
                    mobile: "0525358638",
                    city: "Dubai",
                    licenseNo: 1234
                })
            })
            .expect(200, done)
    })
})