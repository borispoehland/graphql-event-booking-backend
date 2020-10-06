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
    createEvent: async (_, { eventInput }) => {
      const event = createEventDocument(eventInput);

      const savedEvent = await event.save();

      const creator = await User.findById('5f7c64fd48977051afa40a23');
      if (!creator) throw new Error('User not found.');
      creator.createdEvents = [...creator.createdEvents, event];
      await creator.save();

      return withISODate(savedEvent.toObject());
    },
  },
};
