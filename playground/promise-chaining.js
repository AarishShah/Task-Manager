require('../src/db/mongoose')
const User = require('../src/models/user')


// User.findByIdAndUpdate
//     (
//         '63bc580d8953868044f89fec',
//         { age: 1 }
//     ).then
//     (
//         (user) =>
//         {
//             console.log(user);
//             return User.countDocuments // accepts an object
//                 (
//                     { age: 1 }
//                 )
//         }
//     ).then
//     (
//         (result) => { console.log(result); }
//     ).catch
//     (
//         (e) => { console.log(e); }
//     )

// learning async fn
const upadteAgeAndCount = async (id, age) => 
{
    const user = await User.findByIdAndUpdate(id, { age }) // age: age, but since both are named same, we can just use age along
    const count = await User.countDocuments({ age })
    return count
}

upadteAgeAndCount('63bc580d8953868044f89fec', 2).then((count) => { console.log(count); }).catch((e) => { console.log(e); })