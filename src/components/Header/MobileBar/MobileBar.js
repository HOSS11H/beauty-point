import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import GridOnIcon from '@mui/icons-material/GridOn';
import PersonIcon from '@mui/icons-material/Person';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const MobileBarWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${ ( { theme } ) => theme.palette.common.white};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    z-index: 9999;
    @media screen and (min-width: 900px) {
        display: none;
    }
    .mobile-bar-link {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items    : center;
        padding: 8px 20px;
        transition: 0.3s ease-in-out;
        svg {
            font-size: 18px;
            color: ${ ( { theme } ) => theme.vars.primary};
            margin-bottom :1px;
            transition                : 0.3s ease-in-out;
        }
        span {
            font-size: 12px;
            color: ${ ( { theme } ) => theme.palette.common.black};
            text-transform: capitalize;
            transition                : 0.3s ease-in-out;
        }
        &:hover {
            background-color: ${ ( { theme } ) => theme.vars.primary};
            svg{
                color: ${ ( { theme } ) => theme.palette.common.white};
                transform: translateY(7px);
            }
            span {
                opacity: 0;
            }
        }
    }
`


const MobileBar = props => {
    return (
        <MobileBarWrapper>
            <NavLink to="/" className="mobile-bar-link">
                <HomeIcon />
                <span>home</span>
            </NavLink>
            <NavLink to="/" className="mobile-bar-link">
                <RoomIcon />
                <span>nearby</span>
            </NavLink>
            <NavLink to="/" className="mobile-bar-link">
                <GridOnIcon />
                <span>appointed</span>
            </NavLink>
            <NavLink to="/auth" className="mobile-bar-link">
                <PersonIcon />
                <span>profile</span>
            </NavLink>
        </MobileBarWrapper>
    )
}
export default MobileBar;