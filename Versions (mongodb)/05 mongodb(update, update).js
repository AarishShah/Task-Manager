const { MongoClient, ObjectID } = require('mongodb') // destructing

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    // console.log('Connected correctly!'); // To check if connection is established or not

    const db = client.db(databaseName)

    // updateOne

    // const updatePromise = db.collection('users').updateOne(

    //     // which item to update
    //     {
    //         _id: new ObjectID("63bbd0642c8ca1236c4d1a80")
    //     },
    //     // this parameter sets new values or updates the previous values
    //     {
    //         $set:
    //         {
    //             name: 'John'
    //         }
    //     })

    // // calllback but since we are using promises
    // updatePromise.then((result) => {
    //     console.log(result);
    // }
    // ).catch((error) => {
    //     console.log(error);
    // })

    // or

    db.collection('users').updateOne(

        // which item to update
        {
            _id: new ObjectID("63bbd0642c8ca1236c4d1a80")
        },
        // this parameter sets new values or updates the previous values
        {
            $set:
            {
                name: 'John'
            }
        })

        // calllback but since we are using promises
        .then((result) => {
            console.log(result);
        }
        ).catch((error) => {
            console.log(error);
        })


    // using increment operator
    const updatePromise = db.collection('users').updateOne(

        // which item to update
        {
            _id: new ObjectID("63bbd0642c8ca1236c4d1a80")
        },
        // this parameter sets new values or updates the previous values
        {
            $inc:
            {
                age: 1
            }
        })

    // calllback but since we are using promises
    updatePromise.then((result) => {
        console.log(result);
    }
    ).catch((error) => {
        console.log(error);
    })

    // updateMany
    db.collection('tasks').updateMany
        (
            // object to find
            {
                completed: false
            },

            // object to update
            {
                $set:
                {
                    completed: true
                }
            }
        ).then
        (
            (result) => { console.log(result); }
        ).catch
        (
            (error) => { console.log(error); }
        )
})