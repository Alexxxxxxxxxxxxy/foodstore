import {Db, MongoClient} from 'mongodb'

let dbConnection:Db

const connectToDb = (cb:Function)=>{
    MongoClient.connect("mongodb://mongodb:27017/foodstore")
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