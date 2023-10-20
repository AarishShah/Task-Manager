const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect
    (
        'mongodb://127.0.0.1:27017/task-manager-api',
        {
            useNewUrlParser: true,
            // useCreateIndex: true
        }
    )

const User = mongoose.model
    (
        'User',
        {
            name:
            {
                type: String,
                required: true, // this field needs to be present or data field won't be created
                trim: true
            },

            email:
            {
                type: String,
                required: true,

                lowercase: true,

                validate(value)
                {
                    if (!validator.isEmail(value))
                    {
                        throw new Error('Email is invalid')
                    }
                }
            },

            age:
            {
                type: Number,
                default: 0,
                validate(value)
                {
                    if (value < 0)
                    {
                        throw new Error('Age must be a positive number')
                    }
                },
                trim: true
            },

            password:
            {
                type: String,
                required: true,
                minlength: 7,
                trim: true,
                validate(value)
                {
                    if (value.toLowerCase().includes('password'))
                    {
                        throw new Error('Password cannot contain "password"')

                    }
                }

            }

        }
    )

const me = new User
    (
        {
            name: '        Andrew   ',
            email: 'MYEMAIL@MEAD.IO',
            password: '123ssword'
            // age: -27, // will be validated
            // email: 'mike@' // will be validated
        }
    )

me.save().then
    (
        () => { console.log(me); }
    ).catch
    (
        (error) => { console.log('Error!', error); }
    )

// challenge
// const Task = mongoose.model
//     (
//         'Tasks',
//         {
//             description:
//             {
//                 type: String,
//                 required: true,
//                 trim: true,

//             },

//             completed:
//             {
//                 type: Boolean,
//                 default: false
//             }
//         }
//     )

// const myTask = new Task
//     (
//         {
//             description: '   Eat lunch',
//             completed: false
//         }
//     )

// myTask.save().then
//     (
//         () => { console.log(myTask); }
//     ).catch
//     (
//         (error) => { console.log('Error ', error); }
//     )