const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Author {
_id: ID!
authorName: String
}

type Title {
_id: ID
title: String
}

type Body {
content: String
}

type Timestamp {
dateScribed: Int
}

type Likes {
count: Int
}

type Views {
count: Int
}

type Subject {
tag: String
}

type Query {
 author:[Author]
 title: [Title]
 body: [Body]
 timestamp: [Timestamp]
 likes: [Likes]
 views: [views]
 subject: [Subject]
}

type Mutation {
    addUser( )
    addEntry(username: String!, title: String!, body: String!, subject: String) : Entry
    editEntry(title: String!, body: String!, subject: String!) : Entry
    deleteEntry(titleId: ID!) : Entry
    userLogin( )

}
`;

module.exports = typeDefs;