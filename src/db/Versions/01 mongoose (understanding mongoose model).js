const mongoose = require('mongoose')

mongoose.connect
    (
        'mongodb://127.0.0.1:27017/task-manager-api',
        {
            useNewUrlParser: true,
            // useCreateIndex: true // will create index as well // this line doesn't work
        }
    )

// this is the model of constructive fn 'User'
const User = mongoose.model
    (
        'User', // string name for my model
        {
            name:
            {
                type: String
            },

            age:
            {
                type: Number
            }
        }
    )

// I am calling my fn 'User' and using it's model to store various values, this is called instance
const me = new User
    (
        {
            name: 'Andrew', // needs to be a string since I have defined it as such in the fn above
            age: 27         // needs to be a number since I have defined it as such in the fn above
        }
    )

// save takes no arguments and returns a promise
me.save().then
    (
        () => { console.log(me); }
    ).catch
    (
        (error) => { console.log('Error!', error); }
    )

// challenge
const Task = mongoose.model
    (
        'Tasks',
        {
            description:
            {
                type: String
            },

            completed:
            {
                type: Boolean
            }
        }
    )

const myTask = new Task
    (
        {
            description: 'Learn the Mongoose library',
            completed: false
        }
    )

myTask.save().then
    (
        () => { console.log(myTask); }
    ).catch
    (
        (error) => { console.log('Error ', error); }
    )