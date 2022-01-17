import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import AuthContext from '../../../../store/auth-context';
import UserProfile from './UserProfile/UserProfile';

const ModuleContactWrapper = styled.div`
    display    : inline-flex;
    align-items: center;
    @media screen and (max-width: 899.98px) {
        display:none;
    }
`
export const ModuleButton = styled(NavLink)`
    font-size:15px;
    width: 148px;
    font-weight: 700;
    padding: 0 10px;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color:  ${ ( { theme } ) => theme.palette.common.white};
    color: ${ ( { theme } ) => theme.vars.secondary};
    border:0;
    outline: none;
    cursor: pointer;
    border-radius: 30px;
    transition: 0.3s ease-in-out;
    text-transform: capitalize;
    &:hover {
        background-color: ${ ( { theme } ) => theme.vars.secondary};
        color: ${ ( { theme } ) => theme.palette.common.white};
    }
`

const ModuleAuth = props => {
    const {t} = useTranslation();

    const authCtx = useContext(AuthContext);

    const {isLoggedIn} = authCtx;

    return (
        <ModuleContactWrapper>
            {!isLoggedIn && <ModuleButton to='/auth' >{t('login')}</ModuleButton>}
            {isLoggedIn && <UserProfile />}
        </ModuleContactWrapper>
    )
}

export default ModuleAuth;