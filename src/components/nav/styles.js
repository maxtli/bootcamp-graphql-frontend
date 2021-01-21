import styled from 'styled-components'
import { Link } from 'react-router-dom'
import theme from '../../theme'

export const NavBar = styled.div`
    height: 100px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: ${theme.colors.blue3};
`

export const SLink = styled(Link)`
    color: white;
    margin: 50px 50px 0;
    font-size: 24px;
    font-weight: 700;
    display:inline-block;
    text-decoration: none;
    &:hover {
        color: red;
    }
`
