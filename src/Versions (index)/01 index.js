const express = require('express')
require('../db/mongoose') // to connect mongose to the database
const User = require('../models/user') // to load user
const Task = require('../models/task') // to load task

const app = express()
const port = process.env.PORT || 3000 // to make our app work on heroku

// configuring express to automatically parse thwe incoming json so we can use it as an oject
app.use(express.json())

// we can call this as route handler
app.post('/users', (req, res) =>
{
    const user = new User(req.body) // User fn need the param that we created in the model but req.body is returning the data in that format itself

    user.save().then
        (
            () => { res.status(201).send(user) } // 201 for created
        ).catch
        (
            (e) => { res.status(400).send(e) } // 400 for client side errors
        );
})

// reading endpoints for users
app.get('/users', (req, res) =>
{
    User.find({/* Keeping this empty will fetch all users in the db*/ }).then
        (
            (users) => { res.send(users) }
        ).catch
        (
            (e) => { res.status(500).send() } // 500 is internal serever error
        );
}
)

app.get('/users/:id', (req, res) => 
{
    const _id = req.params.id  // parameter id will be strored in id

    User.findById(_id).then
        (
            (user) =>
            {
                // since mongodb would return no value with success we need to use conditional logic
                if (!user)
                {
                    return res.status(404).send()
                }

                res.send(user)
            }
        ).catch
        (
            (e) => { res.status(500).send() }
        )
}
)

app.post('/tasks', (req, res) =>
{
    const task = new Task(req.body)

    task.save().then
        (
            () => { res.status(201).send(task) }
        ).catch
        (
            (e) => { res.status(400).send(e) }
        );
})

// reading endpoints for tasks
app.get('/tasks', (req, res) =>
{
    Task.find({}).then
        (
            (task) => { res.status(201).send(task) }
        ).catch
        (
            (e) => { res.status(400).send(e) }
        )
}
)

app.get('/tasks/:id', (req, res) => 
{
    const _id = req.params.id

    Task.findById(_id).then
        (
            (task) =>
            {
                if (!task) 
                {
                    return res.status(404).send()
                }

                res.send(task)
            }
        ).catch
        (
            (e) => { res.status(500).send() }
        )
}
)

app.listen
    (port, () => 
    {
        console.log('Server is up on port ' + port);
    }
    )