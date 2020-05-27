MongoClient = require('mongodb').MongoClient
var dbUrl = "mongodb://localhost:27017";

MongoClient.connect(dbUrl, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
