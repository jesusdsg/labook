const bcrypt = require('bcrypt');
const helpers = {};

helpers.encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

helpers.matchPassword = async (password, savedPassword) => {
    const match = await bcrypt.compare(password, savedPassword);
    return match;
} 

module.exports = helpers;