const add = (a, b) => 
{
    return new Promise
        (
            (resolve, reject) => 
            {
                setTimeout(() =>
                {
                    resolve(a + b)
                }, 2000);
            })
}

// add(1, 2).then
//     (
//         (sum) =>
//         {
//             console.log(sum);
//             // nest promise call
//             add(sum, 5).then
//                 (
//                     (sum2) => { console.log(sum2); }
//                 ).catch(e)
//                 (
//                     (e) => { console.log(e); }
//                 );
//         }
//     ).catch
//     (
//         (e) => { console.log(e); }
//     );

// Promise chaining
add(1, 1).then
    (
        (sum) =>
        {
            console.log(sum);
            return add(sum, 4)
        }
    ).then // using then instead of catch, we will use catch in last case
    (
        (sum2) =>
        {
            console.log(sum2);
        }
    ).catch
    (
        (e) => { console.log(e); }
    );