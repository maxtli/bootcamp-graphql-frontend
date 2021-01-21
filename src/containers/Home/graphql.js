import gql from 'graphql-tag'

export const FILTER_AUTHORS = gql`
    query ($stats: authorStatsInput) {
        authors(input: $stats) {
            firstName
            lastName
            age
            email
            numBooksPublished
            address {
                street
                city
                state
                zip
            }
        }
    }
`

export const GET_AUTHOR = gql`
    query ($name: authorNameInput) {
        author(input: $name) {
            firstName
            lastName
            age
            email
            numBooksPublished
            address {
                street
                city
                state
                zip
            }
        }
    }
`

export const ADD_AUTHOR = gql`
    mutation ($author: authorInput) {
        addAuthor(input: $author) {
            firstName
            lastName
            age
            email
            numBooksPublished
            address {
                street
                city
                state
                zip
            }    
        }
    }
`