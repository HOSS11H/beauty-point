import Card from '@mui/material/Card';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, useMediaQuery } from '@mui/material';
import { useContext } from 'react';
import ThemeContext from '../../../store/theme-context';

export const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        max-width: 936px;
        margin: auto;
        overflow: hidden;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius:20px;
        margin-bottom: 40px;
        background-color: ${({ theme }) => theme.palette.background.default};
        &:last-child{
            margin-bottom:0;
        }
        ${({ isMobileModal }) => isMobileModal && css`
            @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md - 1}px) {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                z-index: ${({ theme }) => theme.zIndex.modal};
                border-radius:0;
                transform: translateX(100%);
                transition: 0.3s ease-in-out;
                margin-bottom: 0px;
                ${({ open }) => open && css`
                    transform: translateX(0%);
                `}
            }
        `}
    }
`
export const CardHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: ${({ theme }) => `1px solid ${theme.palette.divider}`};
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md - 1}px) {
        padding: 10px;
    }
    h4 {
        font-size: 22px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
    }
`
export const CardBody = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md - 1}px) {
        padding-left: 10px;
        padding-right: 10px;
    }
    ${({ isMobileModal }) => isMobileModal && css`
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md - 1}px) {
            display:block;
            max-height: calc(100vh - 61px);
            overflow-y: auto;
            min-height: 0;
            // Scroll //
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                height: 7px;
                width: 8px;
                background-color: ${({ theme }) => theme.palette.divider};
                border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb {
                margin-left: 2px;
                background: ${({ theme }) => theme.vars.primary};
                border-radius: 10px;
                cursor: pointer;
            }
        }
    `}
`
export const CardContent = styled.div`
    flex-grow: 1;
    width: 100%;
`
export const SkeletonsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export default function CustomCard(props) {

    const { isMobileModal, open, handleClose } = props;

    const { theme } = useContext(ThemeContext)

    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    const { t } = useTranslation();

    return (
        <CustomCardMui isMobileModal={isMobileModal} open={open} >
            <CardHeading>
                <h4>{t(props.heading)}{props.total}</h4>
                {isMobileModal && isMobile && <IconButton onClick={handleClose}><CloseIcon /></IconButton>}
            </CardHeading>
            <CardBody isMobileModal={isMobileModal} >
                {props.loading && (
                    <SkeletonsWrapper>
                        <Skeleton sx={{ width: '100%' }} />
                        <Skeleton sx={{ width: '100%' }} />
                        <Skeleton sx={{ width: '100%' }} />
                    </SkeletonsWrapper>
                )}
                {!props.loading && (
                    <CardContent>
                        {props.children}
                    </CardContent>
                )}
            </CardBody>
        </CustomCardMui>
    );
}


