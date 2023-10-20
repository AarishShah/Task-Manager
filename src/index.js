//  D:\InstalledSoftwares\mongodb\mongodb\bin\mongod.exe --dbpath=D:\InstalledSoftwares\mongodb\mongodb-data

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