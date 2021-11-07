import {useState} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import LogoDark from '../../images/logo/logo_dark.png';
import LogoLight from '../../images/logo/logo_white.png';

const LogoWrapper =styled(NavLink)`
    width: 170px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LogoImg = styled.img`
    width: 100%;
    object-fit: cover;
`

const Logo = ( props ) => {

    const [ logoColor, setLogoColor] = useState('light')

    const logoColorHandler = ( ( ) => {
        setLogoColor( prevState => (prevState === 'light' ? 'dark' : 'light') );
    } )

    return (
        <LogoWrapper to='/' onClick={props.action}>
            {logoColor === 'light' && <LogoImg src={LogoLight} alt='logo'/>}
            {logoColor === 'dark' && <LogoImg src={LogoDark} alt='logo'/>}
        </LogoWrapper>
    )
}


export default Logo;