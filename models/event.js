const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1, select: '_id email createdEvents' },
  },
}).plugin(autopopulate);

const Event = mongoose.model('Event', eventSchema);

const createEventDocument = ({ title, description, price, date, userId }) => {
  return new Event({
    title,
    description,
    price: +price,
    date: new Date(date),
    creator: userId,
  });
};

module.exports = {
  Event,
  createEventDocument,
};
