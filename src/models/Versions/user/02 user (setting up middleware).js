const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema
    (
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

// to set the middleware up
userSchema.pre('save', async function (next) // 1st parameter = name of the event, 2nd parameter = normal fn and not the arrow fn. This is because we will be using 'this' which is not a binding in the arrow fn
{
const user = this // here, value of document that is to be saved
console.log('just before saving!');
next() // when we are done with 'this' go to next, without next() program would just keep waiting forever
}
)

const User = mongoose.model('user', userSchema)

module.exports = User