// Code won't work in this here, copyt to index
const Task = require('./models/task')


const main = async () =>
{
    // to find a user with the help of task id
    const task = await Task.findById('63cb4092a026dc29a9b4586f')
    await task.populate('owner')/*.execPopulate()*/ // by doing this the owner filed will ref the details of the 'user'
    console.log(task.owner);

    // to find a task with the help of user id
       const user = await User.findById('63cb3e3b16300d5f2ae464b7')
       await user.populate('tasks')/*.execPopulate()*/ // .execPopulate() has been removed
       console.log(user.tasks);

}

main()