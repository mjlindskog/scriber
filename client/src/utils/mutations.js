import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
      savedEntries
      favoriteEntries
      visitedEntries
      hash
    }
  }
}
`

export const ADD_ENTRY = gql`
mutation AddEntryMutation($username: String!, $title: String!, $body: String!, $subject: String) {
  addEntry(username: $username, title: $title, body: $body, subject: $subject) {
    authors
    title
    body
    timestamp
    subject
    views
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
mutation Mutation($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    token
    user {
      username
      email
      savedEntries
      favoriteEntries
      visitedEntries
      hash
    }
  }
}
`