import React, {useReducer} from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_AUTHOR, FILTER_AUTHORS } from './graphql'
import { GTable, TitleStrip, Button, CentralContainer, Content } from '../../styles'
import AuthorList from './AuthorList'
import FormGenerator from '../../components/FormGenerator'

const listReducer = (prevState, payload) => {
    if(payload === 'clear')
    return {}
    const copy = Object.assign({}, prevState)
    copy[payload.name] = {err: payload.err, value: payload.value}
    return copy
}
const Home = () => {
    const [form, setForm] = useReducer(listReducer, {})
    const [addAuthor] = useMutation(ADD_AUTHOR, {
        variables: {
            author: {
                name: {
                    firstName: form.FirstName && form.FirstName.value,
                    lastName: form.LastName && form.LastName.value
                },
                age: form.Age && parseInt(form.Age.value),
                email: form.Email && form.Email.value,
                numBooksPublished: form.NumBooks && parseInt(form.NumBooks.value),
                address: {
                    street: form.StreetAddress && form.StreetAddress.value,
                    city: form.City && form.City.value,
                    state: form.State && form.State.value,
                    zip: form.Zip && form.Zip.value
                }
            }
        },
        update: (client, {data: {addAuthor}}) => {
            try{
            const data = client.readQuery({query: FILTER_AUTHORS})
            data.authors = [...data.authors, addAuthor]
            client.writeQuery({query: FILTER_AUTHORS, data})
            } catch(error) {

            }
        }
    })
    try{
    return (<>
    <TitleStrip>Author List</TitleStrip>
    <Content>
    <CentralContainer>
        <form onSubmit={(e) => {
            e.preventDefault();
            let err = false;
            ['FirstName', 'LastName', 'StreetAddress', 'City', 'State', 'Zip'].forEach((item) => {
                if(!(form[item] && form[item].value)) {
                    setForm({name: item, err: true, value: ''});
                    err = true;
                }
            })
            if(err)
                return false;
            addAuthor();
            setForm('clear')
        }}>
            <table style={{width: '100%'}}>
            {FormGenerator(form, setForm, {FirstName: {}, LastName: {}, Age: {}, NumBooks: {}, StreetAddress: {span: 3}, City: {}, 
                State: {type: 'sel', options: ['MA', 'CT', 'RI', 'NH', 'ME', 'VT']}, Zip: {}, Email: {span: 2}}, 
                [['FirstName', 'LastName', 'Age'], ['StreetAddress'], ['City', 'State', 'Zip'], ['NumBooks', 'Email']])}
            </table>
            <Button>Add New Author!</Button>
        </form>
    </CentralContainer>
    <GTable>
        <tr>
            {['Name', 'Age', 'Email', 'Address'].map((item) => <td>{item}</td>)}
        </tr>
        <AuthorList />
    </GTable>
    </Content>
    </>)
    } catch(err) {
        return <Content>An error occurred. Error details: {JSON.stringify(err)}</Content>
    }
}


export default Home
