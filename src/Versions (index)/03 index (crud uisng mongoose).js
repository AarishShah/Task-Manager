const express = require('express')
require('./db/mongoose') // to connect mongose to the database
const User = require('./models/user') // to load user
const Task = require('./models/task') // to load task
const { findByIdAndDelete } = require('./models/user')

const app = express()
const port = process.env.PORT || 3000 // to make our app work on heroku

// configuring express to automatically parse the incoming json so we can use it as an oject
app.use(express.json())

// we can call this as route handler
// creating a user
app.post('/users', async (req, res) =>
{
    const user = new User(req.body) // User fn need the param that we created in the model but req.body is returning the data in that format itself

    try // we use try catch becasue if an error is generated it might stop our program, so we catch it using try-catch
    {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) { res.status(400).send(e) }
})

// reading all users
app.get('/users', async (req, res) =>
{
    try
    {
        const users = await User.find({/* Keeping this empty will fetch all users in the db*/ })
        res.send(users)
    } catch (e)
    { res.status(500).send() }
}
)

// read one usesr
app.get('/users/:id', async (req, res) => 
{
    const _id = req.params.id  // parameter id will be strored in id

    try
    {
        const user = await User.findById(_id)
        if (!user)
        {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) { res.status(500).send() }
}
)

// update
app.patch('/users/:id', async (req, res) =>
{
    const updates = Object.keys(req.body) // (res.body is an object of array). We need to convert this object of array into arrya of string. This is done via keys which will return array of strings
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every // this is an array method
        (
            (update) => allowedUpdates.includes(update) //shorthand
        )

    if (!isValidOperation)
    {
        return res.status(404).send({ error: 'Invalid updates' })
    }

    try
    {
        const user = await User.findByIdAndUpdate
            (
                req.params.id,
                req.body,
                {
                    new: true, // hover over 'new' to read
                    runValidators: true
                }
            )

        if (!user)
        {
            return res.status(404).send()
        }
        res.status(200).send()

    } catch (e)
    {
        res.status(400).send(e)
    }
}
)

// deleting a user
app.delete('/users/:id', async (req, res) =>
{
    try
    {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user)
        {
            return res.status(404).send()

        }
        res.send(user)
    }
    catch (e)
    {
        res.status(500).send()
    }
}
)

/*
-----------------------------------------------------------------------------------
                                    Tasks
-----------------------------------------------------------------------------------
*/

// creating a task
app.post('/tasks', async (req, res) =>
{
    const task = new Task(req.body)

    try
    {
        await task.save()
        res.status(201).send(task)

    } catch (e)
    { res.status(400).send(e) }

})

// reading endpoints for tasks
app.get('/tasks', async (req, res) =>
{
    try
    {
        const task = await Task.find({})
        res.status(201).send(task)

    } catch (e) { res.status(400).send(e) }
}
)

// reading one task
app.get('/tasks/:id', async (req, res) => 
{
    const _id = req.params.id
    try
    {
        const task = await Task.findById(_id)

        if (!task)
        {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e)
    { res.status(500).send() }

}
)

// updating a task
app.patch('/tasks/:id', async (req, res) =>
{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation)
    {
        return res.status(404).send({ error: 'Invalid updatesqqqqq' })
    }

    try
    {
        const task = await Task.findByIdAndUpdate
            (
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            )

        if (!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch (e)
    {
        res.status(400).send(e)

    }
}
)

// deleting a task
app.delete('/tasks/:id', async (req, res) =>
{
    try
    {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e)
    {
        res.status(500).send(e)
    }
}

)

app.listen
    (port, () => 
    {
        console.log('Server is up on port ' + port);
    }
    )