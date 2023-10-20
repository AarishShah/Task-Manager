const add = (a, b) => 
{
    return new Promise
        (
            (resolve, reject) => 
            {
                setTimeout(() =>
                {
                    if (a<0 || b <0)
                    {
                        return reject('Numbers must be positive.')
                    }
                    resolve(a + b)
                }, 2000);
            })
}

const doWork = async () => // using async returns a promise
{
    const sum = await add(1, 99) // await gets used with a promise
    const sum2 = await add(sum, 50)
    const sum3 = await add(sum2, -3) // program ends if error is detected
    return sum3
}

doWork().then
    (
        (result) => { console.log('result', result); }
    ).catch
    (
        (e) => { console.log('e', e); }
    )


/*
// Normal fn
const doWork1 = () =>
{

}

console.log(doWork1()); // js fn return undefined when they are empty

*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
// async fn
const doWork = async () =>
{
    throw new Error('something went wrong') // when we throw error promise does not return result and hence it would return error
    return 'Andrew'
}

doWork().then
    (
        (result) => { console.log('result', result); }
    ).catch
    (
        (e) => { console.log('e', e); }
    )

*/