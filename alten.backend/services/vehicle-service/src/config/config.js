const dbSettings = {
    db: process.env.DB || 'alten',
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || 'e2NNvs8DHt6Y',
    server: process.env.DB_HOST || '35.193.56.101:27017',
    serverParameters: () => ({
        autoReconnect: true,
        poolSize: 10,
        socketoptions: {
            keepAlive: 300,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000
        }
    })
}
// server parameters
const serverSettings = {
    port: process.env.PORT || 3001
}

module.exports = Object.assign({}, { dbSettings, serverSettings })