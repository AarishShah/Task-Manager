require('../src/db/mongoose')
const Task = require("../src/models/task");
const { findByIdAndDelete } = require('../src/models/user');

// Task.findByIdAndDelete
//     (
//         '63be800afc28f6bb5dc5c74b'
//     ).then
//     (
//         (task) =>
//         {
//             console.log(task);
//             return Task.countDocuments
//                 (
//                     { completed: false }
//                 )
//         }
//     ).then
//     (
//         (result) => { console.log(result); }
//     ).catch
//     (
//         (e) => { console.log(e); }
//     )

const deleteTaskAndCount = async (id) =>
{
    /*const task =*/ await Task.findByIdAndDelete(id) // this will work as well since we don't need task
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('63be81249425e2c3bec36e93').then((count) => { console.log(count); }).catch((e) => { console.log(e); })