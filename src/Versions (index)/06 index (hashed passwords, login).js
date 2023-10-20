const express = require('express')
require('./db/mongoose') // to connect mongose to the database

const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000 // to make our app work on heroku

app.use(express.json()) // configuring express to automatically parse the incoming json so we can use it as an oject
app.use(userRouter) // to register our router
app.use(taskRouter)

app.listen
    (port, () => { console.log('Server is up on port ' + port); })

const bcrypt = require('bcryptjs');

const myFunction = async () => 
{
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8) // 2ns parameter tell us how many time must a hash fn be performed on the password. 8 is a good number, too less = unsecured, too high = performance drop

    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare('red12345!', hashedPassword) // hover over fn to know about it.
    console.log(isMatch);
}

myFunction()