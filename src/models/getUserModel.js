const mongoose = require('mongoose');

// Define a schema (you can adjust fields based on your users collection)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// Create a model for the users collection

const GetUser = mongoose.model('User', userSchema, 'users'); // 'users' is the collection name

export default GetUser;
