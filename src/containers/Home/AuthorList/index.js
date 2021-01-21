import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FILTER_AUTHORS } from '../graphql'

const AuthorList = () => {
    const { loading, error, data } = useQuery(FILTER_AUTHORS, {
        onCompleted: data => {},
        onError: error => {},
        partialRefetch: true
    })
    return (<>
        {error ? (<tr><td colspan="4">{JSON.stringify(error)}An error occurred.</td></tr>) 
        : loading ? (<tr><td colspan="4">Loading...</td></tr>) : 
        data.authors.map((author) => (<tr><td>{author.firstName + ' ' + author.lastName}</td>
        <td>{author.age || 'N/A'}</td><td>{author.email || 'N/A'}</td><td>
            {author.address ? author.address.street + ', ' + author.address.city + ', ' + author.address.state + ' (' + author.address.zip + ')' : 'N/A'}</td></tr>))}
    </>)
}

export default AuthorList