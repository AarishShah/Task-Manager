const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model
    (
        'user',
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

module.exports = User