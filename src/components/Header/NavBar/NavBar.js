import { Container } from '@mui/material';
import styled, { css, keyframes } from 'styled-components';
import ModuleMood from '../Modules/ModuleMood/ModuleMood';
import { Wrapper } from '../Modules/ModuleMood/ModuleMood';
import ModuleSearch from '../Modules/ModuleSearch/ModuleSearch';
import logoWhite from '../../../images/logo/logo_white.png';
import logoDark from '../../../images/logo/logo_dark.png';
import { useTranslation } from 'react-i18next';
import ModuleAuth from '../Modules/ModuleAuth/ModuleAuth';
import { NavLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import {ModuleSearchWrapper} from '../Modules/ModuleSearch/ModuleSearch';
import {ModuleButton} from '../Modules/ModuleAuth/ModuleAuth';

const fadeInDown = keyframes`
    from {
        opacity  : 0;
        transform: translateY(-200px)
    }

    to {
        opacity  : 1;
        transform: translateY(0)
    }
`;

const Logo = styled(NavLink)`
    display: flex;
    align-items: center;
    flex-basis    : 220px;
    height   : auto;
    margin-right: 40px;
    @media screen and (max-width: 420px) {
        flex-basis: 150px;
        margin-right: 30px;
    }
    img {
        max-width: 100%;
        &.logo-dark {
            display: none;
        }
    }
`
const NavbarNav = styled.ul`
    margin:0;
    padding:0;
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: auto;
    @media screen and (max-width: 899.98px) {
        display: none;
    }
    .nav-item {
        position: relative;
        margin-right: 30px;
        &:last-child {
            margin-right: 0px;
        }
        > a {
            font-size: 18px;
            font-weight: 500;
            color: ${ ( { theme } ) => theme.palette.common.white };
            line-height:1;
            position: relative;
            transition: 0.3s ease-in-out;
            &::before {
                content         : "";
                position        : absolute;
                bottom          : -5px;
                left            : 0;
                margin          : auto;
                width           : 0%;
                height          : 4px;
                background      : ${ ( { theme } ) => theme.vars.secondary};
                transition      : 0.3s ease-in-out;
            }
        }
        &:hover {
            >a {
                color: ${ ( { theme } ) => theme.vars.secondary};
                &::before {
                    width : 100%;
                }
            }
        }
    }
`
const Nav = styled.nav`
    ${({ sticky }) => sticky && css`
        & {
            position  : fixed;
            top       : 0;
            right     : 0;
            left      : 0;
            background: ${({ theme }) => theme.palette.background.default};
            animation :  ${fadeInDown} 1s ease-in-out;
            box-shadow: 0 2px 4px rgba(3, 27, 78, 0.1);
            z-index: 5554;
            & ${Logo} {
                img {
                    &.logo-light {
                        display: none;
                    }
                    &.logo-dark {
                        display: inline-block;
                        @media screen and (min-width: 600px) {
                        }
                    }
                }
            }
            & ${NavbarNav} {
                .nav-item {
                    a {
                        color: ${ ( { theme } ) => theme.palette.text.primary };
                    }
                }
            } 
            & ${Wrapper} {
                svg {
                    color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.palette.common.white : theme.vars.secondary};
                }
            }
            & ${ModuleSearchWrapper} {
                .module-icon {
                    background: ${ ( { theme } ) => theme.vars.secondary};
                    svg {
                        color: ${ ( { theme } ) => theme.palette.common.white};
                    }
                }
            }
            & ${ModuleButton} {
                background-color:  ${ ( { theme } ) => theme.vars.secondary};
                color: ${ ( { theme } ) => theme.palette.common.white};
            }
        }
    `}
`
const NavHolder = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 100%;
`
const ModulesHolderPhone = styled.div`
    display: none;
`
const ModulesHolder = styled.div`
    display: flex;
    align-items: center;
`
const NavbarCollapse = styled.div`
    display: flex;
    flex-basis: auto;
    flex-grow: 1;
    @media screen and (max-width: 899.98px) {
        justify-content: flex-end;
    }
`
const navLinks = [
    {
        name: 'Home',
        link: '/home',
    },
    {
        name: 'categories',
        link: '/home/all-categories',
    },
    {
        name: 'deals',
        link: '/home/all-deals',
    },
    {
        name: 'join us',
        link: '/auth?page=join-us',
    },
]


const NavBar = () => {
    const { t } = useTranslation()

    const [isSticky, setIsSticky] = useState(false);

    const headerRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])


    return (
        <Nav  ref={headerRef} sticky={isSticky} >
            <Container maxWidth="lg">
                <NavHolder>
                    <Logo to='/home'>
                        <img className="logo-light" src={logoWhite} alt="logo" />
                        <img className="logo-dark" src={logoDark} alt="logo" />
                    </Logo>
                    <ModulesHolderPhone>
                        <ModuleSearch />
                        <ModuleMood />
                    </ModulesHolderPhone>
                    <NavbarCollapse>
                        <NavbarNav>
                            {
                                navLinks.map((item, index) => {
                                    return (
                                        <li key={index} className="nav-item">
                                            <NavLink to={item.link}>
                                                {t(item.name)}
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </NavbarNav>
                        <ModulesHolder>
                            <ModuleSearch />
                            <ModuleMood />
                            <ModuleAuth />
                        </ModulesHolder>
                    </NavbarCollapse>
                </NavHolder>
            </Container>
        </Nav>
    )
}
export default NavBar;