const express = require('express')
require('./db/mongoose') // to connect mongose to the database
const User = require('./models/user') // to load user
const Task = require('./models/task') // to load task

const app = express()
const port = process.env.PORT || 3000 // to make our app work on heroku

// configuring express to automatically parse the incoming json so we can use it as an oject
app.use(express.json())

// we can call this as route handler
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

// reading endpoints for users
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

app.listen
    (port, () => 
    {
        console.log('Server is up on port ' + port);
    }
    )