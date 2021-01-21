import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyle from './styles'
import client from './client'
import Home from './containers/Home'
import Books from './containers/Books'
import Publishers from './containers/Publishers'
import NavBar from './components/nav'

const App = () => (
  <Router>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <NavBar />
        <div className="App">
          <Switch>
            <Route path="/books" component={Books} />
            <Route path="/publishers" component={Publishers} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </ApolloProvider>
    </ThemeProvider>
  </Router>
)

export default App
