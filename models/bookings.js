const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      autopopulate: { maxDepth: 2 },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1, select: '_id email createdEvents' },
    },
  },
  { timestamps: true }
).plugin(autopopulate);

const Booking = mongoose.model('Booking', bookingSchema);

const createBookingDocument = (event, userId) => {
  return new Booking({
    event,
    user: userId,
  });
};

module.exports = {
  Booking,
  createBookingDocument,
};
