// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID= mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb') // destructing

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID() // this will generate new id for us
// console.log(id);
// console.log(id.id); // this will give hexadecimal value of id
console.log(id.id.length);
console.log(id.toHexString().length); // string size will be double than that of in binary form, but in string it helps us to visualise things ealisy
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    // console.log('Connected correctly!'); // To check if connection is established or not

    const db = client.db(databaseName)

    db.collection('users').insertOne({

        // _id: id, // this way we can add our own object id if we wanted
        name: 'Vikram',
        age: 26
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result.insertedId) // https://github.com/mongodb/node-mongodb-native/blob/HEAD/etc/notes/CHANGES_4.0.0.md , result.ops is deprecated
    })
})