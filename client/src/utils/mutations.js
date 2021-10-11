import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation Mutation($addUserUsername: String!, $addUserEmail: String!, $addUserPassword: String!) {
        addUser(username: $addUserUsername, email: $addUserEmail, password: $addUserPassword) {
            token
            user {
            username
            _id
            hash
            password
            email
            favoriteEntries
            visitedEntries
            savedEntries
            }
        }
    }
`

export const ADD_ENTRY = gql`
    mutation AddEntryMutation($addEntryUsername: String!, $addEntryTitle: String!, $addEntryBody: String!, $addEntrySubject: String) {
        addEntry(username: $addEntryUsername, title: $addEntryTitle, body: $addEntryBody, subject: $addEntrySubject) {
            _id
            authors
            title
            body
            timestamp
            views
            subject
        }
    }
`

export const EDIT_ENTRY = gql`
    mutation EditEntryMutation($editEntryTitle: String!, $editEntryBody: String!, $editEntrySubject: String!) {
        editEntry(title: $editEntryTitle, body: $editEntryBody, subject: $editEntrySubject) {
            _id
            authors
            title
            timestamp
            body
            subject
            views
        }
    }
`

export const DELETE_ENTRY = gql`
    mutation DeleteEntryMutation($deleteEntryTitleId: ID!) {
        deleteEntry(titleId: $deleteEntryTitleId) {
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

export const USER_LOGIN = gql`
    mutation UserLoginMutation($userLoginEmail: String!, $userLoginPassword: String!) {
        userLogin(email: $userLoginEmail, password: $userLoginPassword) {
            token
            user {
            _id
            username
            }
        }
    }
`