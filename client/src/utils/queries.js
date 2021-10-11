import { gql } from '@apollo/client';

export const QUERY_ENTRIES = gql`
    query Query($hash: String!) {
        getEntry(hash: $hash) {
            authors
            title
            body
            subject
            timestamp
            views
            public
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
            email
            savedEntrys
            favoriteEntrys
            visitedEntrys
        }
    }
`