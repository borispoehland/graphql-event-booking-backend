const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: { maxDepth: 1 },
    },
  ],
}).plugin(autopopulate);

const User = mongoose.model('User', userSchema);

const createUserDocument = ({ email, password }) => {
  return new User({
    email,
    password: bcrypt.hashSync(password, 12),
  });
};

module.exports = {
  User,
  createUserDocument,
};
