import { Db, MongoClient } from 'mongodb';
let dbConnection;
const connectToDb = (cb) => {
    MongoClient.connect("mongodb://mongodb:27017/foodstore")
        .then(client => {
        dbConnection = client.db();
        return cb();
    }).catch(err => {
        return cb(err);
    });
};
const getDb = () => {
    return dbConnection;
};
export { connectToDb, getDb };
//# sourceMappingURL=usermodel.js.map