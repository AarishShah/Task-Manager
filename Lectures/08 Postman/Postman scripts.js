if (pm.response.code === 200)
{
    pm.environment.set('authToken', pm.response.json().token) //  will convert json to obj and obj is the return value
}