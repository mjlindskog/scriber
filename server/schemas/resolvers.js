const { Entry } = require('../models/Entry');
const User = require('../models/User');

const resolvers = {
    Query: {
        getEntry: async (parent, { hash }) => {
            const foundEntry = await Entry.find(hash)
            if (!foundEntry) {
                throw new AuthenticationError('No Entry Found 🥲');
            } else {
                return await Entry.find({ entryID });
            }
        },
        getUser: async (parent, { hash }) => {
            const foundUser = await User.findOne(hash);

            if (!foundUser) {
                throw new AuthenticationError('Something went wrong 🥲');
            } else {
                return foundUser;
            }
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const res = await getSingleUserController({ _id: context.user._id });
                return res
            }
            throw new AuthenticationError('You need to be logged in!');
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
            const newEntry = await Entry.create({ username, title, body, subject });

            if (!newEntry) {
                console.error('Error Saving Entry 🥲')
            }
            return
        },
        editEntry: async (parent, { title, body, subject, hash }) => {
            return Entry.findOneAndUpdate(
                { hash: hash },
                {
                    $addToSet: { title: title, body: content, subject: tag }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

        },
        deleteEntry: async (parent, { hash }) => {
            return Entry.findOneAndDelete({ hash: hash });
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
