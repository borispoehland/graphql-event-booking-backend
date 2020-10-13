const { Event, createEventDocument } = require('../../models/event');
const { User } = require('../../models/user');
const { withISODate } = require('../utils');

module.exports = {
  Query: {
    events: async () => {
      const events = await Event.find().lean({ autopopulate: true });
      return events.map(withISODate);
    },
  },
  Mutation: {
    createEvent: async (_, { eventInput }, { isAuth, userId }) => {
      if (!isAuth) throw new Error('Unauthenticated!');

      const event = createEventDocument({... eventInput, userId });

      const savedEvent = await event.save();

      const creator = await User.findById(userId);
      if (!creator) throw new Error('User not found.');
      creator.createdEvents = [...creator.createdEvents, event];
      await creator.save();

      return withISODate(savedEvent.toObject());
    },
  },
};
