import React from 'react'
import { NavBar, SLink } from './styles'

export default () => (
  <NavBar>
    <SLink to="/">Authors</SLink>
    <SLink to="/books">Books</SLink>
    <SLink to="/publishers">Publishers</SLink>
  </NavBar>
)
