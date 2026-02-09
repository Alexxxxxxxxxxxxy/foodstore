import {Db, MongoClient} from 'mongodb'

let dbConnection:Db

const connectToDb = (cb:Function)=>{
    const mongoUrl = process.env.MONGO_URL || "mongodb://mongodb:27017/foodstore"
    MongoClient.connect(mongoUrl)
    .then(client=>{
        dbConnection=client.db()
        return cb()
    }).catch(err=>{
        return cb(err)
    })
}

const getDb = ()=>{
    return dbConnection
}

export {connectToDb, getDb}