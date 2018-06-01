const MongoClient = require('mongodb')

const connect = (options, mediator) => {
    mediator.once('boot.ready', () => {
        const url = `mongodb://${options.user}:${options.pass}@${options.server}/admin`
        MongoClient.connect(url, (err, client) => {
            if (err) {
                mediator.emit('db.error', err)
            }
            const db = client.db(options.db);
            mediator.emit('db.ready', client, db)
        })
    })
}

module.exports = Object.assign({}, { connect })


