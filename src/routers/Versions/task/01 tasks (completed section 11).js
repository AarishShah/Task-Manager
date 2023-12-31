const express = require('express');
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) =>
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
router.get('/tasks', async (req, res) =>
{
    try
    {
        const task = await Task.find({})
        res.status(201).send(task)

    } catch (e) { res.status(400).send(e) }
}
)

// reading one task
router.get('/tasks/:id', async (req, res) => 
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
router.patch('/tasks/:id', async (req, res) =>
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
router.delete('/tasks/:id', async (req, res) =>
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

module.exports = router