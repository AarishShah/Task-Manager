const express = require('express');
const User = require('../models/user') // to load user
const auth = require('../middleware/auth');
const router = new express.Router()

// to signup
router.post('/users', async (req, res) =>
{
    const user = new User(req.body) // User fn need the param that we created in the model but req.body is returning the data in that format itself

    try // we use try catch becasue if an error is generated it might stop our program, so we catch it using try-catch
    {
        await user.save()
        const token = await user.geenerateAuthToken()

        res.status(201).send({ user, token }) // shorthand
    }
    catch (e) { res.status(400).send(e) }
})

// to login
router.post('/users/login', async (req, res) =>
{
    try
    {
        const user = await User.findByCredentials(req.body.email, req.body.password) // User is the collection and user is the current instance of User Collection
        const token = await user.geenerateAuthToken()
        res.send({ user, token }) // shorthand

    } catch (e)
    {
        res.status(400).send()
    }
}
)
// logging out
router.post('/users/logout', auth, async (req, res) =>
{
    try
    {
        req.user.tokens = req.user.tokens.filter( // getting user's token and setting a filtered version of it

            (token) =>
            {
                return token.token !== req.token  // (token that is currently present !== the token that was used) ---- if they are equal, false will be returned ---- thus (filtering it and) removing that token from token's array
            }
        )
        await req.user.save()
        res.send()
    }

    catch (e)
    {
        res.status(500).send()
    }
}
)

// logging out of all devices
router.post('/users/logoutAll', auth, async (req, res) =>
{
    try 
    {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch (e)
    {
        res.status(500).send()

    }
}
)

// repurposing it to 'read me' from read all users
router.get('/users/me', auth, async (req, res) => // points to remember: req is made to '/users' then it will execute auth and then only "the route handler"(3rd argument). Also, auth must call next() present in it or router handler will not execute 
{
    res.send(req.user)
}
)

// read one user
router.get('/users/:id', async (req, res) => 
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
router.patch('/users/:id', async (req, res) =>
{
    const updates = Object.keys(req.body) // (req.body is an object of array). We need to convert this object of array into arrya of string. This is done via keys which will return array of strings
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every // this is an array method, if this is present in array
        (
            (update) => allowedUpdates.includes(update) //shorthand
        )

    if (!isValidOperation)
    {
        return res.status(404).send({ error: 'Invalid updates' })
    }

    try
    {
        const user = await User.findById(req.params.id) // we got the access to the instance of user model

        updates.forEach((update) => user[update] = req.body[update])

        await user.save() // here our middleware will be executed

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
router.delete('/users/:id', async (req, res) =>
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

module.exports = router