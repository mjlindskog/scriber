const { Entry } = require('../models/Entry');
const User = require('../models/User');

const resolvers = {
    Query: {
        getEntry: async (parent, { entryID }) => {
            const foundEntry = await Entry.find({ entryID })
            if (!foundEntry) {
                throw new AuthenticationError('No Entry Found 🥲');
            } else {
                return await Entry.find({ entryID });
            }
        },
        getUser: async (parent, { username }) => {
            const foundUser = await User.findOne(username);

            if (!foundUser) {
                throw new AuthenticationError('Something went wrong 🥲');
            } else {
                return foundUser;
            }
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({
                username,
                email,
                password
            });

            if (!user) {
                throw new AuthenticationError('Something went wrong 🥲');
            }
            const token = signToken(user);
            return { token, user };
        },
        addEntry: async (parent, { username, title, body, subject }) => {
            return Entry.create({ username, title, body, subject });
        },
        editEntry: async (parent, { titleId }) => {
            return Entry.findOneAndUpdate(
                { _id: titleId },
                {
                    $addToSet: { title: title, body: content, subject: tag }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        },
        deleteEntry: async (parent, { titleId }) => {
            return Entry.findOneAndDelete({ _id: titleId });
        },
        userLogin: async (parent, { email, password }) => {
            // add mutation for user login
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Something went wrong 🥲');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Something went wrong 🥲');
            }
            const token = signToken(user);
            return { token, user };
        }

    }
};

module.exports = resolvers;
