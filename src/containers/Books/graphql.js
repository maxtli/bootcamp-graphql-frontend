import gql from 'graphql-tag'

export const ALL_BOOKS = gql`
    query {
        books {
            title
            language
            pages
            publishDate
            author {
                firstName
                lastName
            }
            publisher {
                name
            }
        }
        authors {
            firstName
            lastName
        }
        publishers {
            name
        }
    }
`

export const ADD_BOOK = gql`
    mutation ($author: authorNameInput!, $publisher: String!, $book: bookInput) {
        addBook (authorName: $author, publisher: $publisher, input: $book) {
            title
            language
            pages
            publishDate
            author {
                firstName
                lastName
            }
            publisher {
                name
            }
        }
    }
`