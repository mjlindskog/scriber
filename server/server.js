const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express()
const port = process.env.PORT || 3001;

// Apollo setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.applyMiddleware({app});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

db.once('open', () => {
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  console.log(`GraphQL: http://localhost:${port}${server.graphqlPath}`)
});
});