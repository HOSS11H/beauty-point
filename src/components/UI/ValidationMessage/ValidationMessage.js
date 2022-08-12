import styled, { css } from 'styled-components'

const ValidationMessage = styled.p`
    flex-basis: 100%;
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
    ${({ small }) => small && css`
        font-size: 13px;
    `}
`

export default ValidationMessage;