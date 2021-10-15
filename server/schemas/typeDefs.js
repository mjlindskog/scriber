const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedEntries: [String]
        favoriteEntries: [String]
        visitedEntries: [String]
        hash: String
    }

    type Entry {
        _id: ID
        authors: [String]
        title: String
        body: String
        timestamp: String
        subject: String
        views: String
        hash: String
        public: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }

type Query {
    getEntry(hash: String!): Entry
    getUser(hash: String!): User
    me: User
    getTopFive: [Entry]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addEntry(authors: String!, title: String!, body: String!, subject: String) : Entry
    editEntry(title: String!, body: String!, subject: String!, hash: String) : Entry
    deleteEntry(hash: String): Entry
    userLogin(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;