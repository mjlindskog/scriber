const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        savedEntrys: [Entry]
        favoriteEntrys: [Entry]
        visitedEntrys: [Entry]
    }

    type Entry {
        _id: ID
        authors: [String]!
        title: String!
        body: String!
        timestamp: String
        subject: String!
        views: String
    }

    type Auth {
        token: ID!
        user: User
    }

type Query {
    getEntry(entryID: String!): Entry
    getUser(username: String!): User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addEntry(username: String!, title: String!, body: String!, subject: String) : Entry
    editEntry(title: String!, body: String!, subject: String!) : Entry
    deleteEntry(titleId: ID!) : Entry
    userLogin(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;