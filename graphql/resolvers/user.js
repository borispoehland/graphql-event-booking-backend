const { User, createUserDocument } = require('../../models/user');

module.exports = {
  Query: {
    user: async (_, { _id }) => {
      // return await User.findOne({_id}).populate('createdEvents').lean();
      return await User.findOne({ _id }).lean({ autopopulate: true });
    },
  },
  Mutation: {
    createUser: async (_, { userInput: { email, password } }) => {
      if (await User.findOne({ email })) throw new Error('User exists already.');

      const user = createUserDocument({ email, password });

      const savedUser = await user.save();

      return { ...savedUser.toObject(), password: null };
    },
  },
};
