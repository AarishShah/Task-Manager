
// Without middleware: new request -> run route handler

// With middleware:    new request -> do something -> run route handler

const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use((req, res, next) => 
{
    console.log(req.method, req.path);
    next() // without the user will have to wait indefinitely for a response. this means we are done with our fn and go to next
}
)
/*
 Output: 
            GET / users / 63c71f5cb4a24f36351def09
            GET / users

*/

// challenge site in maintenance mode
app.use((req, res, next) =>
{
    res.status(503).send('Site is currently down. Check back soon!')
}
)