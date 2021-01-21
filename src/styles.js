import styled, { createGlobalStyle, css } from 'styled-components'
import theme from './theme'

export default createGlobalStyle`
body {
    background-color: lightgoldenrodyellow;
    font-family: Garamond;
    font-size: 14px;
    padding: none;
    height: 100%;
    margin:0;
    text-align: center
}
`

export const CentralContainer = styled.div`
    background: white;
    box-shadow: 0 2px 10px 1px ${theme.colors.menugrey};
    width: 90%;
    max-width: 600px;
    margin: 50px auto;
    border-radius: 50px;
    padding: 20px;
    box-sizing: border-box;
    font: calc(12px + 0.5vw) Garamond;
`

export const TitleStrip = styled.div`
    background-color: ${theme.colors.yellow3};
    box-sizing:border-box;
    color: ${theme.colors.yellow1};
    font-size:40px;
    font-weight:1000;
    font-family:Garamond;
    padding:10px 0 10px 0;
    top: 100px;
    position:fixed;
    text-align:center;
    text-shadow:2px 2px 10px #D2691E;
    z-index: 1;
    width:100%;
`

const gtext = css`
    border:1px solid #000;
    border-radius:5px;
    box-sizing:border-box;
    font-family:Helvetica;
    font-size:14px;
    margin:0;
    padding:3px 6px;
    width: 100%

    &:focus {
        box-shadow: 0 0 7px 3px ${theme.colors.green3};
    }
`

export const Input = styled.input`${gtext}`
export const Select = styled.select`${gtext}`

export const Button = styled.button`
    background-color: ${theme.colors.blue3};
    border:2px solid #FFF;
    border-radius:5px;
    color:#FFF;
    font-family:Overlock;
    font-size:18px;
    padding:5px 20px;
    text-align:left;

    &:hover {
        box-shadow: 0 0 5px 2px ${theme.colors.menugrey};
    }
`

export const ErrLabel = styled.a`
    color: red;
    font-size: 14px;
    font-weight: 700;
    font-family: Nunito;
`

export const Content = styled.div`
    margin-top: 200px;
`

export const GTable = styled.table`
    background-color: #FFF;
    border:3px solid ${theme.colors.red3};
    border-radius:10px;
    border-spacing: 0;
    margin:10px auto;
    min-width: 300px;
    position:relative;
    overflow: hidden;
    & tr:first-child td {
        font-size: 20px;
        font-weight: 700;
        background-color: ${theme.colors.blue1}
        border-bottom: 2px solid ${theme.colors.disabledgrey}
    }
    & td {
        padding: 5px
    }
`

export const LabelRow = styled.tr`
    & td {
        padding: 10px 10px 0 10px;
        font-weight: 700;
    }
`

export const InputRow = styled.tr`
    & td {
        padding: 0 5px 10px 5px;
    }
`
