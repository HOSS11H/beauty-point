import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import styled, { css } from 'styled-components';
import { useContext, useEffect, useRef } from 'react';
import AuthContext from '../../../../../store/auth-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserProfileWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
`

const UserImg = styled.div`
    cursor: pointer;
`

const CustomAvatar = styled(Avatar)`
    width: 50px;
    height: 50px;
    background-color: ${({ theme }) => theme.vars.secondary};
    color: ${({ theme }) => theme.palette.common.white};
    text-transform: uppercase;
    @media screen and (max-width: 499.98px) {
        width: 40px;
        height: 40px;
    }
`

const DropdownWrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: ${({ theme }) => theme.palette.background.default};
    position: absolute;
    top: calc(100% + 15px);
    right: 100%;
    transform: translateX(33%);
    z-index: 100;
    width: 150px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s ease-in-out;
    opacity: 0;
    visibility: hidden;
    ${({ open }) => open && css`
        & {
            opacity: 1;
            visibility: visible;
        }
    `}
    li {
        border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
        &:last-child {
            border-bottom: none;
        }
        a, button {
            display: block;
            padding: 10px;
            color: ${({ theme }) => theme.palette.text.primary};
            font-size: 14px;
            font-weight: 500;
            text-transform: capitalize;
            transition: 0.3s ease-in-out;
            &:hover {
                color: ${({ theme }) => theme.vars.secondary};
            }
        }
        button {
            border: 0;
            box-shadow: none;
            background: transparent;
            width: 100%;
            text-align: left;
            cursor: pointer;
        }
    }
`

const UserProfile = props => {

    const {t} = useTranslation();

    const authCtx = useContext(AuthContext);

    const { logout, userLetter } = authCtx;

    const ref = useRef()

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        /**
         * if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <UserProfileWrapper ref={ref} >
            <UserImg onClick={handleOpen}>
                <CustomAvatar >{userLetter}</CustomAvatar>
            </UserImg>
            <DropdownWrapper open={open}>
                <li>
                    <NavLink to='/account/dashboard'>
                        <span>{t('My Account')}</span>
                    </NavLink>
                </li>
                <li>
                    <button onClick={logout}>
                        <span>{t('logout')}</span>
                    </button>
                </li>
            </DropdownWrapper>
        </UserProfileWrapper>
    )
}
export default UserProfile;