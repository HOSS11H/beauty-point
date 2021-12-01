import styled, { css } from 'styled-components'

const ValidationMessage = styled.p`
    flex-basis: 100%;
    font-size: 15px;
    line-height:1.5;
    text-transform: uppercase;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.success.main};
    margin-top: 10px;
    text-align: left;
    ${({ exist }) => exist && css`
        color: ${({ theme }) => theme.palette.success.main};
    `}
    ${({ notExist }) => notExist && css`
        color: ${({ theme }) => theme.palette.error.main};
    `}
`

export default ValidationMessage;