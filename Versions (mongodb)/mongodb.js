// Move this file to '10 Task Manager' to run it properly

const { MongoClient, ObjectID } = require('mongodb') // destructing

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    // console.log('Connected correctly!'); // To check if connection is established or not

    const db = client.db(databaseName)

    // deleteMany
    db.collection('users').deleteMany
        (
            {
                age: 27
            }
        ).then
        (
            (result) => { console.log(result); }
        ).catch
        (
            (error) => { console.log(error); }
        )

    // deleteOne

    db.collection('tasks').deleteOne
        (
            {
                description: "Clean the house"
            }
        ).then
        (
            (result) => { console.log(result); }
        ).catch
        (
            (error) => { console.log(error); }
        );
})