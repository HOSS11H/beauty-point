import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationItemWrapper = styled.li`
    margin: 10px 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin-bottom: 20px;
    @media (min-width: 768px) {
        margin: 0;
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
        margin-right: 40px;
        margin-bottom: 0px;
        &:last-child {
            margin-right: 0px;
        }
    }
`

const StyledLink = styled(NavLink)`
    color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.white : theme.vars.black };
    text-decoration: none;
    text-transform: capitalize;
    width: 100%;
    box-sizing: border-box;
    transition: 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover , &:active , &.active {
        color: ${ ( { theme } ) => theme.vars.primary  };
    }
    @media screen and (min-width: 500px) {
        text-transform: capitalize;
        height: 100%;
        transition: 0.3s ease-in-out;
        &:hover , &:active , &.active {
            color: ${ ( { theme } ) => theme.vars.primary  };
        }
    }
`;

const NavigationItem = (props) => (
    <NavigationItemWrapper>
        <StyledLink to={props.link} exact={props.exact} onClick={props.clicked}>{props.children}</StyledLink>
    </NavigationItemWrapper>
);

export default NavigationItem;