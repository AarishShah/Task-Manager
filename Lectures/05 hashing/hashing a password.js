const bcrypt = require('bcryptjs');

const myFunction = async () => 
{
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8) // 2ns parameter tell us how many time must a hash fn be performed on the password. 8 is a good number, too less = unsecured, too high = performance drop

    console.log(password);
    console.log(hashedPassword);

    const isMatch1 = await bcrypt.compare('Red12345!', hashedPassword) // hover over fn to know about it.
    console.log(isMatch1);

    const isMatch2 = await bcrypt.compare('red12345!', hashedPassword)
    console.log(isMatch2);
}

myFunction()