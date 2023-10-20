const { MongoClient, ObjectID } = require('mongodb') // destructing

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    // console.log('Connected correctly!'); // To check if connection is established or not

    const db = client.db(databaseName)

    // findOne to find individual data/file
    // db.collection('users').findOne({ _id: '63bad15f19e2a79726fc78ce' }, (error, user) => { // id need to be converted first or null will be given out
    db.collection('users').findOne({ _id: new ObjectID('63bad15f19e2a79726fc78ce') }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(user);
    })

    // find multiple documents
    db.collection('users').find({ age: 27 }).toArray((error, users) => { // find returns a cursor and not object
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(users);
    })

    // to count
    db.collection('users').find({ age: 27 }).count((error, count) => {  // Warning: cursor.count is deprecated and will be removed in the next major version, please use `collection.estimatedDocumentCount` or `collection.countDocuments` instead // 8th January 2023
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log("Count " + count);
    })

    // challenge
    db.collection('tasks').findOne({ _id: new ObjectID('63b7f77a2de6f4151d8a781c') }, (error, incomplete) => { // this runs before any other fn, why?
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(incomplete);
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to fetch');
        }
        console.log(tasks);
    })
})