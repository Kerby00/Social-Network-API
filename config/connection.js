const {connect, connection} = require('mongoose');

const dbConnect =
process.env.MONGODB_URI || 'mongodb://localhost:27017/NetworkDB';

connect(dbConnect)

module.exports = connection;