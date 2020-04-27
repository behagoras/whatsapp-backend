const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

console.log(config)

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`
console.log('MONGO_URI: ', MONGO_URI)

// const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor () {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
    this.dbName = DB_NAME
  }

  connect () {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err)
          }
          console.log('Connected succesfully to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }

    return MongoLib.connection
  }

  getAll (collection, query, { page = 1, limit = 50 }) {
    console.log(page)
    console.log(limit)
    console.log(page * limit)

    return this.connect().then((db) => db
      .collection(collection)
      .find(query)
      .skip(page * limit)
      .limit(limit)
      .sort({ name: 1 })
      .toArray())
  }

  get (collection, id) {
    return this.connect().then((db) => db.collection(collection).findOne({ _id: ObjectId(id) }))
  }

  create (collection, data) {
    return this.connect()
      .then((db) => db.collection(collection).insertOne(data))
      .then((result) => result.insertedId)
  }

  update (collection, id, data) {
    return this.connect()
      .then((db) => db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: false }))
      .then((result) => result.upsertedId || id)
  }

  delete (collection, id) {
    return this.connect()
      .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }))
      .then(() => id)
  }
}

module.exports = MongoLib
