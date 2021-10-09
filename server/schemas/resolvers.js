const { Entry } = require('../models');

const resolvers = {
Query: {
author: async () => { 
    return await Author.find({}).populate('authorName');
},
title: async () => {
    return await Title.find({}).populate('title').sort({ dateScribed: -1 });
},
body: async () => {
    return await Body.find({}).populate('content').sort({ dateScribed: -1 });
},
timestamp: async () => {
    return await Timestamp.find({}).populate('dateScribed').sort({ dateScribed: -1 });
},
likes: async () => {
    return await Likes.find({}).populate('count');
},
views: async () => {
    return await Views.find({}).populate('count');
},
subject: async () => {
    return await Subject.find({}).populate('tag');
},
},

Mutation: {
    addUser: async () => {
// Add mutation for new users
    },
    addEntry: async ({username, title, body, subject}) => {
        return Entry.create({ username, title, body, subject});
    },
    editEntry: async (titleId) => {
        return Entry.findOneAndUpdate(
            {_id: titleId},
            {
                $addToSet: {title: title, body: content, subject: tag}
            },
            {
                new: true,
                runValidators: true,
            }
        );

    },
    deleteEntry: async (titleId) => {
        return Entry.findOneAndDelete({_id: titleId});
    },
    userLogin: async () => {
// add mutation for user login
    }

}
};

module.exports = resolvers;
