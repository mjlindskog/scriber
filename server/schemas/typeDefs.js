const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Author {
_id: ID!
authorName: String
}

type Title {
title: String
}

type Body {
_id: ID
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
`;

module.exports = typeDefs;