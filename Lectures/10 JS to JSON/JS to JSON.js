// JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays. It is a common data format with diverse uses in electronic data interchange, including that of web applications with servers.

// JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).

const pet =
{
    name: 'Hal'
}
console.log(JSON.stringify(pet));

pet.toJSON = function ()
{
    return {}
}

console.log(JSON.stringify(pet));

// we used this concept in methodSchema in user model to hide password and tokens