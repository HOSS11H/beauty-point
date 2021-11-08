import styled from 'styled-components';

export const Button = styled.button`
    font-size: 18px;
    padding:0 20px;
    display: inline-flex;
    align-items:center;
    justify-content: center;
    height: 60px;
    margin-bottom: 15px;
    width:100%;
    background: ${ ( { theme } ) => theme.vars.primary};
    color: #fff;
    border:0;
    outline: none;
    cursor: pointer;
    text-transform: capitalize;
    transition: 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 10px;
    &:disabled {
        background: #eee;
        color: #999;
        box-shadow: none;
    }
    &:last-child {
        margin-bottom: 0;
    }
`