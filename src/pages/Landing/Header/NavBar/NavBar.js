import { Container } from '@mui/material';
import styled from 'styled-components';
import ModuleCart from '../Modules/ModuleCart/ModuleCart';
import ModuleSearch from '../Modules/ModuleSearch/ModuleSearch';
import logoSrc from '../../../../assets/images/logo/logo-light.png';
import { useTranslation } from 'react-i18next';
const Nav = styled.nav`
    
`
const NavHolder = styled.div`
    display: flex;
    align-items: center;
    height: 100px;
    width: 100%;
`
const Logo = styled.a`
    display: flex;
    align-items: center;
    margin-right: 40px;
    img {
        max-width: 100%;
        width    : 220px;
        height   : auto;
    }
` 
const ModulesHolderPhone = styled.div`
    display: none;
`
const NavbarCollapse = styled.div`
    display: flex;
    flex-basis: auto;
    flex-grow: 1;
`
const NavbarNav = styled.ul`
    margin:0;
    padding:0;
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: auto;
    .nav-item {
        position: relative;
        margin-right: 30px;
        &:last-child {
            margin-right: 0px;
        }
        > a {
            font-size: 18px;
            font-weight: 500;
            color: #fff;
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
                background      : ${ ( { theme } ) => theme.vars.primary  };
                transition      : 0.3s ease-in-out;
            }
        }
        &:hover {
            >a {
                color: ${ ( { theme } ) => theme.vars.primary  };
                &::before {
                    width : 100%;
                }
            }
        }
    }
`
const navLinks = [
    {
        name : 'Home',
        link : '/',
    },
    {
        name : 'categories',
        link : '/',
    },
    {
        name : 'deals',
        link : '/',
    },
    {
        name : 'join us',
        link : '/',
    },
]


const NavBar = () => {
    const { t } = useTranslation()
    return (
        <Nav>
            <Container maxWidth="lg">
                <NavHolder>
                    <Logo>
                        <img src={logoSrc} alt="logo" />
                    </Logo>
                    <ModulesHolderPhone>
                        <ModuleSearch />
                        <ModuleCart />
                    </ModulesHolderPhone>
                    <NavbarCollapse>
                        <NavbarNav>
                            { 
                                navLinks.map( ( item, index ) => {
                                    return (
                                        <li key={index} className="nav-item">
                                            <a className="nav-link" href={item.link}>
                                                {t(item.name)}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </NavbarNav>
                        <div className="module-holder">
                            <ModuleSearch />
                            <ModuleCart />
                        </div>
                    </NavbarCollapse>
                </NavHolder>
            </Container>
        </Nav>
    )
}
export default NavBar;