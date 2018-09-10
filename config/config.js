// TODO: create new username (secure) and pw
var prodConfig = {
    cors: false,
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
};

console.log(process.env);
module.exports = process.env.NODE_ENV === 'production' ? prodConfig : require('./devConfig');

