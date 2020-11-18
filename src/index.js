const host = '0.0.0.0'
const port = '8080'

const server = require('./controller')
var MongoClient = require('mongodb').MongoClient;
const dbName = "introtonode";
var url = "mongodb+srv://IntroToNodeJs:azerty@cluster0.bvesz.mongodb.net/intronode?retryWrites=true&w=majority";

// Connect to database
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {

    if (err)
        throw err;

    var dbo = db.db("intronode");
});

server.listen(port, host, () => {
    console.log(`Server running on http://localhost:${port}/`)
})

exports.client;