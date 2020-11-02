const { User, createUserDocument } = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('User does not exist!');

      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error('Password is incorrect!');

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return { userId: user.id, token, tokenExpiration: 1 };
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
