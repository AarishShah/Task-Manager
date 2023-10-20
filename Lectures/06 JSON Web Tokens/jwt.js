/*

Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE2NzM5OTA0OTUsImV4cCI6MTY3NDU5NTI5NX0.z9H-8w_NjhEIQh6aZIFOY0TGPt8iw3EmeYZS3x2cE1s

A token is sepated into 3 parts by the use of period.
Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Payload/Body: Data that we provide
Signature: to verify the token

Token is not private, it is public

Source: https://codeburst.io/jwt-to-authenticate-servers-apis-c6e179aa8c4e


*/

const jwt = require('jsonwebtoken');

const myFunction = async () =>
{
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '7 Days'}) // object(unique identifier), string(this is called secert), options
    console.log(token);

    const data = jwt.verify(token, 'thisismynewcourse') // token we need to verify, the secret to use
    console.log(data);
}

myFunction()