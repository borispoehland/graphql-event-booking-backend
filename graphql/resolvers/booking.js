const { withISODate } = require('../utils');
const { Booking, createBookingDocument } = require('../../models/bookings');
const { Event } = require('../../models/event');

module.exports = {
  Query: {
    bookings: async (parent, args, { isAuth }) => {
      if (!isAuth) throw new Error('Unauthenticated!');

      const bookings = await Booking.find().lean({ autopopulate: true });
      return bookings.map(withISODate);
    },
  },
  Mutation: {
    createBooking: async (_, { eventId }, { isAuth, userId }) => {
      if (!isAuth) throw new Error('Unauthenticated!');

      const event = await Event.findById(eventId);
      if (!event) throw new Error('Event not found');

      const booking = createBookingDocument(event, userId);

      const savedBooking = await booking.save();

      return withISODate(savedBooking.toObject());
    },
    cancelBooking: async (_, { bookingId }, { isAuth }) => {
      if (!isAuth) throw new Error('Unauthenticated!');

      const booking = await Booking.findById(bookingId).lean({ autopopulate: true });
      if (!booking) throw new Error('Booking not found');

      const event = booking.event;

      await Booking.deleteOne({ _id: bookingId });

      return event;
    },
  },
};
