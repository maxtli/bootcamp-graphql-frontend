import gql from 'graphql-tag'

export const ALL_PUBLISHERS = gql`
    query {
        publishers {
            name
            address {
                street
                city
                state
                zip
            }
        }
    }
`
