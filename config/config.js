const prodConfig = {
    cors: process.env.NODE_ENV !== 'production',
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD,
};

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : require('./devConfig');
// module.exports = prodConfig;

