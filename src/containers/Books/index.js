import React, {useReducer} from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GTable, TitleStrip, Button, CentralContainer, Content } from '../../styles'
import FormGenerator from '../../components/FormGenerator'
import { ALL_BOOKS, ADD_BOOK } from './graphql'

const listReducer = (prevState, payload) => {
    const copy = Object.assign({}, prevState)
    copy[payload.name] = {err: payload.err, value: payload.value}
    return copy
}
const Book = () => {
    const [form, setForm] = useReducer(listReducer, {})
    const { loading, error, data } = useQuery(ALL_BOOKS, {
        onCompleted: data => {},
        onError: error => {},
        partialRefetch: true
    })
    const [addBook] = useMutation(ADD_BOOK, {
        variables: {
            book: {
                title: form.Title && form.Title.value,
                language: form.Language && form.Language.value,
                pages: form.Pages && form.Pages.value
            },
            author: {
                firstName: form.Author && form.Author.value.split(' ')[0],
                lastName: form.Author && form.Author.value.split(' ', 2)[1]
            },
            publisher: form.Publisher && form.Publisher.value
        },
        update: (client, {data: {addBook}}) => {
            try {
            const data = client.readQuery({query: ALL_BOOKS})
            data.books = [...data.books, addBook]
            client.writeQuery({query: ALL_BOOKS, data})
            } catch (error) {

            }
        }
    })
    try {
    return (<>
    <TitleStrip>Book List</TitleStrip>
    <Content>
    <CentralContainer>
        <form onSubmit={(e) => {
            e.preventDefault();
            let err = false;
            ['Title', 'Language', 'Author', 'Publisher'].forEach((item) => {
                if(!(form[item] && form[item].value)) {
                    setForm({name: item, err: true, value: ''});
                    err = true;
                }
            })
            if(err)
                return false;
                alert(JSON.stringify({
                    input: {
                        title: form.Title && form.Title.value,
                        language: form.Language && form.Language.value,
                        pages: form.Pages && form.Pages.value
                    },
                    author: {
                        firstName: form.Author && form.Author.value.split(' ')[0],
                        lastName: form.Author && form.Author.value.split(' ', 2)[1]
                    },
                    publisher: form.Publisher && form.Publisher.value
                }))
            addBook();
        }}>
            <table style={{width: '100%'}}>
            {FormGenerator(form, setForm, {Title: {span: 2}, Language: {}, Pages: {}, PublishDate: {}, Author: {span: 2, type: 'sel', 
            options: error || loading ? [] : data.authors.map((author) => author.firstName + ' ' + author.lastName)}, Publisher: {type: 'sel',  
            options: error || loading ? [] : data.publishers.map((publisher) => publisher.name)}}, 
            [['Title'], ['Language', 'Pages'], ['Publisher', 'PublishDate'], ['Author']])}
            </table>
            <Button>Add New Book!</Button>
        </form>
    </CentralContainer>
    <GTable>
        <tr>
            {['Title', 'Language', 'Author', 'Publisher'].map((item) => <td>{item}</td>)}
        </tr>
        {error ? (<tr><td colspan="4">{JSON.stringify(error)}An error occurred.</td></tr>) 
        : loading ? (<tr><td colspan="4">Loading...</td></tr>) : 
        data.books.map((book) => (<tr><td>{book.title}</td><td>{book.language}</td><td>{book.author.firstName + ' ' + book.author.lastName}</td><td>{book.publisher.name}</td></tr>))}
    </GTable>
    </Content></>)
    } catch(err) {
        return <Content>An error occurred. Error details: {JSON.stringify(err)}</Content>
    }
}


export default Book