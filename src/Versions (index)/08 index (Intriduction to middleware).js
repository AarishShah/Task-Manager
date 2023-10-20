const express = require('express')
require('./db/mongoose') // to connect mongose to the database

const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000 // to make our app work on heroku

app.use((req, res, next) => 
{
    if (req.method === 'GET')
        res.send('GET requests are disabled')
    else
        next()
}
)

// site in maintenance mode
app.use((req, res, next) =>
{
    res.status(503).send('Site is currently down. Check back soon!')
}
)

app.use(express.json()) // configuring express to automatically parse the incoming json so we can use it as an oject
app.use(userRouter) // to register our router
app.use(taskRouter)

app.listen
    (port, () => { console.log('Server is up on port ' + port); })

const jwt = require('jsonwebtoken');

const myFunction = async () =>
{
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 Days' }) // object(unique identifier), string(this is called secert), options
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse') // token we need to verify, the secret to use
    console.log(data);
}

myFunction()