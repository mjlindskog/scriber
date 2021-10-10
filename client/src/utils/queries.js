import { gql } from '@apollo/client';

export const QUERY_ENTRIES = gql`
    query Query($getEntryEntryId: String!) {
        getEntry(entryID: $getEntryEntryId) {
            _id
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
    query Query($getUserUsername: String!) {
        getUser(username: $getUserUsername) {
            _id
            username
            email
            savedEntrys {
            _id
            }
            favoriteEntrys {
            _id
            }
            visitedEntrys {
            _id
            }
        }
    }
`