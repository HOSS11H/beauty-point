import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const LogoWrapper =styled(NavLink)`
    height: 11%;
    color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.white : theme.vars.black };
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    text-decoration: none;
    @media (min-width: 768px) {
        height: 80%;
    }
`
const FooterLogoWrapper =styled(LogoWrapper)`
    justify-content: flex-start;
    margin-bottom: 14px;
    @media screen and (max-width: 600px) {
        justify-content: center;
    }
`
const LogoSpan =styled.span`
    color: ${ ( { theme} ) => theme.vars.primary };
`

const Logo = ( props ) => {
    return (
        <LogoWrapper to='/' onClick={props.action}> 
            synd <LogoSpan>o</LogoSpan>
        </LogoWrapper>
    )
}
export const FooterLogo = ( props ) => {
    return (
        <FooterLogoWrapper to='/' onClick={props.action}> 
            synd <LogoSpan>o</LogoSpan>
        </FooterLogoWrapper>
    )
}


export default Logo;