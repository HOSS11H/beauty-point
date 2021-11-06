import React, { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import styled from 'styled-components';
import Logo from '../../Logo/Logo';
import { NavLink } from 'react-router-dom';

const SideDrawerWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    min-width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: ${props => props.theme.palette.background.default};
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    text-align: center;
    @media (min-width: 768px) {
        display: none;
    }
    ${ ( { opened } ) => opened ?  'transform: translateX(0);' : 'transform: translateX(-100%);' }
`

const Button = styled(NavLink)`
    font-size:14px;
    font-weight: 700;
    padding: 0 20px;
    height: 45px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.white : theme.vars.black };
    color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.black : theme.vars.white };
    border:0;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    margin: 0px auto;
    &:hover {
        color: ${ ( { theme } ) => theme.vars.primary };
    }
    @media screen and (min-width: 768px) {
        display: none;
    }
`

const SideDrawer = ( props ) => {
    
    const {  event: closeSideDrawer } = props ;

    const authCtx = useContext(AuthContext);


    return (
        <React.Fragment>
            <Backdrop show={props.opened} remove={closeSideDrawer} />
            <SideDrawerWrapper opened={props.opened} >
                <Logo action={closeSideDrawer} />
                <nav onClick={closeSideDrawer}>
                    <NavigationItems isAuth={authCtx.isLoggedIn} />
                </nav>
                <Button to='/posts' onClick={closeSideDrawer}>Get started</Button>
            </SideDrawerWrapper>

        </React.Fragment>
    );    
};

export default SideDrawer;