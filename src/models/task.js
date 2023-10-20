const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema
    (
        {
            description:
            {
                type: String,
                required: true,
                trim: true,

            },

            completed:
            {
                type: Boolean,
                default: false
            },

            owner:
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'user' // reference 'user' is case-sensitive
            }
        },
        {
            timestamps: true
        }
    )

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task