import { Container, Grid } from "@mui/material"
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import logoSrc from '../../assets/images/logo/logo-light.png';
import { useTranslation } from "react-i18next";

const Logo = styled(NavLink)`
    display: flex;
    align-items: center;
    img {
        max-width: 100%;
    }
` 

const FooterWrapper = styled.div`
    background-color: #161616;
    padding-top   : 100px;
    padding-bottom: 100px;
    position        : relative;
    @media screen and (max-width: 899.98px) {
        display:none;
    }
    .footer-widget {
        text-align: left;
        .footer-widget-title {
            h3 {
                color         : #eaeaea;
                font-size     : 18px;
                font-weight   : 700;
                line-height   : 30px;
                text-transform: capitalize;
                margin-bottom : 37px;
            }
        }
        &.widget-about {
            .brand {
                display: flex;
            }
        }
        &.widget-links {
            ul {
                padding-left : 0;
                list-style   : none;
                margin-bottom: 0;
                overflow     : hidden;
                transform: translateY(-5px);

                li {
                    display: block;
                    a {
                        color         : ${ ( { theme } ) => theme.palette.common.white};
                        font-size     : 16px;
                        font-weight   : 400;
                        line-height   : 33px;
                        text-transform: capitalize;
                        transition : all 0.3s ease-in-out;
                        &:hover {
                            color: ${ ( { theme } ) => theme.vars.secondary};
                        }
                    }
                }
            }
        }
    }
`

const Footer = props => {

    const {t} = useTranslation()

    return (
        <FooterWrapper>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Logo to='/'>
                            <img src={logoSrc} alt="logo" />
                        </Logo>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className="footer-widget widget-links">
                            <div className="footer-widget-title">
                                <h3>{t('Quick Links')}</h3>
                            </div>
                            <ul>
                                <li><NavLink to='/home'>{t('Home')}</NavLink></li>
                                <li><NavLink to='/home/all-categories'>{t("categories")}</NavLink></li>
                                <li><NavLink to='/home/packages'>{t('packages')}</NavLink></li>
                                <li><NavLink to='/home/faqs'>{t('faqs')}</NavLink></li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className="footer-widget widget-links">
                            <div className="footer-widget-title">
                                <h3>{t('Contact us')}</h3>
                            </div>
                            <ul>
                                <li><NavLink to='/'>{t('about us')}</NavLink></li>
                                <li><NavLink to='/auth?page=join-us'>{t("join us")}</NavLink></li>
                                <li><NavLink to='/'>{t('Contact us')}</NavLink></li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </FooterWrapper>
    )
}
export default Footer