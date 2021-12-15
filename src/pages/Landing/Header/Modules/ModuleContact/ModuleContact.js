import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ModuleContactWrapper = styled.div`
    display    : inline-flex;
    align-items: center;
    @media screen and (max-width: 899.98px) {
        display:none;
    }
`
const ModuleButton = styled(NavLink)`
    font-size:15px;
    width: 148px;
    font-weight: 700;
    padding: 0 10px;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color:  ${ ( { theme } ) => theme.palette.common.white};
    color: #96248e;
    border:0;
    outline: none;
    cursor: pointer;
    border-radius: 30px;
    transition: 0.3s ease-in-out;
    text-transform: capitalize;
    &:hover {
        background-color: #96248e;
        color: ${ ( { theme } ) => theme.palette.common.white};
    }
`

const ModuleContact = props => {
    const {t} = useTranslation();
    return (
        <ModuleContactWrapper>
            <ModuleButton to='/auth' >{t('login')}</ModuleButton>
        </ModuleContactWrapper>
    )
}

export default ModuleContact;