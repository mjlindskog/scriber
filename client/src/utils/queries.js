import { gql } from '@apollo/client';

export const QUERY_ENTRIES = gql`
query Query($hash: String!) {
  getEntry(hash: $hash) {
    authors
    title
    body
    timestamp
    subject
    views
  }
}

`

export const QUERY_USERS = gql`
    query Query($hash: String!) {
        getUser(hash: $hash) {
            username
            favoriteEntrys
        }
    }
`

export const ME = gql`
query Query {
  me {
    username
    savedEntries
    favoriteEntries
    visitedEntries
    hash
  }
}
`

export const TOP_FIVE = gql`
query Query {
  getTopFive {
    authors
    title
    timestamp
    subject
    views
    hash
  }
}
`