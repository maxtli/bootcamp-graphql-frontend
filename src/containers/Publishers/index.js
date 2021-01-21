import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import {TitleStrip, GTable, Content} from '../../styles'
import { ALL_PUBLISHERS } from './graphql'

const Publisher = () => {
    const { loading, error, data } = useQuery(ALL_PUBLISHERS, {
        onCompleted: data => {},
        onError: error => {},
        partialRefetch: true
    })
    try {
    return (<>
    <TitleStrip>Publisher List</TitleStrip>
    <Content>
    <GTable>
        <tr>
            {['Name', 'Address'].map((item) => <td>{item}</td>)}
        </tr>
        {error ? (<tr><td colspan="2">An error occurred.</td></tr>) 
        : loading ? (<tr><td colspan="2">Loading...</td></tr>) : 
        data.publishers.map((publisher) => (<tr><td>{publisher.name}</td><td>
            {publisher.address.street + ', ' + publisher.address.city + ', ' + publisher.address.state + ' (' + publisher.address.zip + ')'}</td></tr>))}
    </GTable>
    </Content></>)
    } catch(err) {
        return <Content>An error occurred. Error details: {JSON.stringify(err)}</Content>
    }
}


export default Publisher
