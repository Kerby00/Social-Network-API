const {connect, connection} = require('mongoose');

const dbConnect =
process.env.MONGODB_URI || 'mongodb://localhost:27017/';

connect(dbConnect)

module.exports = connection;