const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    // console.log('Connected correctly!'); // To check if connection is established or not

    const db = client.db(databaseName)

    // insertOne

    // db.collection('users').insertOne({
    //     name: 'Andrew',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.insertedId) // https://github.com/mongodb/node-mongodb-native/blob/HEAD/etc/notes/CHANGES_4.0.0.md , result.ops is deprecated
    // })

    // insertMany

    // db.collection('users').insertMany(
    //     [
    //         {
    //             name: 'Jen',
    //             age: 28
    //         },
    //         {
    //             name: 'Ken',
    //             age: 29
    //         }
    //     ], (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert user');
    //         }
    //         console.log(result.insertedIds)

    //     })

    // challenge

    db.collection('tasks').insertMany(
        [
            {
                description: 'Clean the house',
                completed: true
            },
            {
                description: 'Renew inspection',
                completed: false
            },
            {
                description: 'Pot plants',
                completed: false
            }
        ], (error, result) => {
            if (error) {
                return console.log('Unable to insert tasks!');
            }
            console.log(result.insertedIds, result.acknowledged)
        }
    )
})