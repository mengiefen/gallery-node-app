const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PhotoApp';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
