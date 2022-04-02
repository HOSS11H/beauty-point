import styled from 'styled-components';
import { Button } from '@mui/material';

export const CustomButton = styled(Button)`
    &.MuiButton-root {
        font-size: 18px;
        padding:0 20px;
        display: inline-flex;
        align-items:center;
        justify-content: center;
        height: 60px;
        margin-bottom: 15px;
        width:100%;
        background: ${ ( { theme } ) => theme.vars.primary};
        color: ${ ( { theme } ) => theme.palette.common.white};
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
        &:hover {
            background: ${ ( { theme } ) => theme.vars.theme};
        }
        &:last-child {
            margin-bottom: 0;
        }
    }
`
export const ButtonSmall = styled(CustomButton)`
    &.MuiButton-root {
        height: 36px;
        font-size:14px
    }
`
export const ButtonText = styled(Button)`
    margin-bottom: 0;
    color: ${ ( { theme } ) => theme.vars.primary};
`
export const ButtonConfirm = styled(CustomButton)`
    &.MuiButton-root {
        margin-bottom: 0;
        min-width: 150px;
        width: auto;
        padding: 0 25px;
        height: 50px;
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md - 1}px) {
            min-width: unset;
            padding: 0 10px
        }
    }
`