const { Entry } = require('../models/Entry');
const User = require('../models/User');
const redis = require('../config/redis')
const { signToken } = require('../utils/auth');

const cacheLength = 3600

const resolvers = {
    Query: {
        getEntry: async (parent, { hash }) => {
            let foundEntry = await redis.get(hash, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    return result
                }
            })
            if (!foundEntry) {
                foundEntry = await Entry.findOne({ 'hash': hash })
                if (!foundEntry) {
                    throw new AuthenticationError('No Entry Found 🥲');
                } else {
                    redis.set(foundEntry.hash, JSON.stringify(foundEntry), 'ex', cacheLength)
                    return foundEntry
                }
            } else {
                foundEntry = JSON.parse(foundEntry);
                return foundEntry
            }
        },
        getUser: async (parent, { hash }) => {
            let foundUser = await redis.get(hash, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    return result
                }
            })

            if (!foundUser) {
                foundUser = await User.findOne({ 'hash': hash }).select('-password, -email');

                if (!foundUser) {
                    console.error('No user found')
                } else {
                    redis.set(foundUser.hash, JSON.stringify(foundUser), 'ex', cacheLength)
                    console.log(foundUser);
                    return foundUser;
                }
            } else {
                foundUser = JSON.parse(foundUser);
                console.log(foundUser);
                return foundUser;
            }
        },
        me: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                const res = await User.findOne({ email: context.user.email });
                return res
            }
            console.error('Authentication error')
        },
        getTopFive: async (parent, args, context) => {
            let res = await redis.get('topFive', (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    return result
                }
            })

            if (!res) {
                res = await Entry.find({ "public": true }).sort('views').exec();
                let arr = []
                for (let i = 0; i < 5; i++) {
                    let newRes = res[i]
                    console.log(newRes);
                    let newAuthor = await User.findOne({ "hash": newRes.authors[0] }).select('username')

                    newAuthor = newAuthor.username
                    newRes.authors[0] = newAuthor
                    arr.push(newRes);
                }
                if (!res) {
                    console.error(err)
                    return
                } else {
                    //console.log(arr);
                    redis.set('topFive', JSON.stringify(arr), 'ex', cacheLength);
                    return res
                }
            } else {
                res = JSON.parse(res);
                return res;
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
            console.log(user);
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
            return newEntry
        },
        editEntry: async (parent, { title, body, subject, hash }) => {
            const updated = await Entry.findOneAndUpdate(
                { 'hash': hash },
                {
                    $addToSet: { title: title, body: content, subject: tag }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            if (!updated) {
                throw new AuthenticationError('Something went wrong 🥲');
            }
            return updated
        },
        deleteEntry: async (parent, { hash }) => {
            const deleted = await Entry.findOneAndDelete({ 'hash': hash });
            if (!deleted) {
                throw new AuthenticationError('Something went wrong 🥲');
            }
            return deleted
        },
        userLogin: async (parent, { email, password }) => {
            // add mutation for user login
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new AuthenticationError('Something went wrong 🥲');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Something went wrong 🥲');
            }
            const token = signToken(user);
            return { token, user };
        },
    }
};

module.exports = resolvers;
