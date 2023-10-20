const { request } = require('express');
const express = require('express');
const Task = require('../models/task')
const auth = require('../middleware/auth');
const { findById } = require('../models/task');
const router = new express.Router()

router.post('/tasks', auth, async (req, res) =>
{
    // const task = new Task(req.body)
    const task = new Task
        (
            {
                ...req.body, // 'body' will be copied to this ojb via '...'
                owner: req.user._id// hardcoding the 'owner' property
            }
        )

    try
    {
        await task.save()
        res.status(201).send(task)

    } catch (e)
    { res.status(400).send(e) }

})

router.get('/tasks', auth, async (req, res) =>
{
    try
    {
        // method 1
        // const task = await Task.find({owner: req.user._id})
        // res.status(201).send(task)

        // method 2
        await req.user.populate('tasks')
        res.status(201).send(req.user.tasks)

    } catch (e) { res.status(400).send(e) }
}
)

// reading one task
router.get('/tasks/:id', auth, async (req, res) => 
{
    const _id = req.params.id
    try
    {
        const task = await Task.findOne // we may specify as many fields we want
            (
                {
                    _id,
                    owner: req.user._id
                }
            )

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
router.patch('/tasks/:id',auth, async (req, res) =>
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
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne
        (
            {
                _id: req.params.id,
                owner: req.user._id
            }
        )

        if (!task)
        {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    }
    catch (e)
    {
        res.status(400).send(e)

    }
}
)

// deleting a task
router.delete('/tasks/:id',auth, async (req, res) =>
{
    try
    {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete
        (
            {
                _id: req.params.id,
                owner: req.user._id
            }
        )

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

module.exports = router