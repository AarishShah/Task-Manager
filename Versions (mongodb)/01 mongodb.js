//To initialize mongodb:
// D:\'Installed Softwares'\mongodb\mongodb-win32-x86_64-windows-6.0.3\bin\mongod.exe --dbpath=D:\'Installed Softwares'\mongodb\mongodb-data

// CRUD - Create, Read, Update, Delete

const mongodb = require('mongodb') // thisw will give an object
const MongoClient = mongodb.MongoClient // allows us to connect to the fn necessary to connect to the database

const connectionURL = 'mongodb://127.0.0.1:27017' // 'mongodb://localhost:27017' using localhost is same as mentioning the localhost but for some unknown reason, it causes some issues and slows down the application
const databaseName = 'task-manager' // any name of my choice

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => { // first argument is understood, 2nd argument is to parse the url correctly, previously there was a default one but it is now deprecated so we use this argument
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log('Connected correctly!');

    const db = client.db(databaseName) // this will give the database reference that is stored in our variable

    // mongodb is a1 NOSQL that means that the data is in the form of collection rather than in the form of tables.
    db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    })
}) 