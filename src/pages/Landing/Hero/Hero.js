
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import heroImgSrc from '../../../assets/images/hero/1.jpg';

const HeroWrapper = styled.div`
    display       : flex;
    align-items   : center;
    height        : 100vh;
    position: relative;
    @media screen and (max-width: 899.98px) {
        padding-top : 100px;
        text-align: center;
    }
`
const HeroContent = styled.div`
    position: relative;
    z-index : 5;
    @media screen and (max-width: 899.98px) {
        text-align: center;
    }
`
const HeroSubTitle = styled.p`
    font-size: 45px;
    font-weight: 500;
    line-height:1.5;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: ${ ( { theme } ) => theme.palette.common.white};
    @media screen and (max-width: 599.98px) {
        font-size: 20px
    }
    `
const HeroTitle = styled.h1`
    font-size: 75px;
    line-height:1.1;
    font-weight: 900;
    text-transform: capitalize;
    margin-bottom: 22px;
    color: ${ ( { theme } ) => theme.palette.common.white};
    @media screen and (max-width: 599.98px) {
        font-size: 32px
    }
`
const HeroDesc = styled.p`
    font-size: 20px;
    line-height:27px;
    font-weight: 300;
    text-transform: capitalize;
    margin-bottom: 32px;
    color: ${ ( { theme } ) => theme.palette.common.white};
    @media screen and (max-width: 599.98px) {
        font-size: 16px
    }
    @media (min-width: 600px) and (max-width: 899.98px) {
        max-width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
`
const HeroAction = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 899.98px) {
        justify-content: center;
    }
    @media screen and (max-width: 599.98px) {
        flex-direction: column;
    }
`
const HeroButton = styled(NavLink)`
    font-size:20px;
    width: 203px;
    font-weight: 700;
    padding: 0 25px;
    height: 64px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${ ( { theme } ) => theme.vars.primary };
    color: ${ ( { theme } ) => theme.palette.common.white};
    border:0;
    outline: none;
    cursor: pointer;
    border-radius: 30px;
    transition: 0.3s ease-in-out;
    margin-right: 30px;
    text-transform: capitalize;
    &:last-child {
        margin-right: 0px;
    }
    @media screen and (max-width: 599.98px) {
        margin-right:0;
        margin-bottom: 15px;
        height: 50px;
        &:last-child {
            margin-bottom: 0px;
        }
    }
    &:hover {
        background-color: ${ ( { theme } ) => theme.palette.common.white};
        color: ${ ( { theme } ) => theme.vars.primary };
    }
    &.inversed {
        background-color: ${ ( { theme } ) => theme.palette.common.white};
        color: ${ ( { theme } ) => theme.vars.primary };
        &:hover {
            background-color: ${ ( { theme } ) => theme.vars.primary };
            color: ${ ( { theme } ) => theme.palette.common.white};
        }
    }
`

const HeroImage = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(150, 36, 142, 0.27);
        z-index:0;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(56, 56, 56, 0.72) 0%, rgba(255, 255, 255, 0) 50%);
        z-index:0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`


const Hero = (  ) => {
    return (
        <HeroWrapper>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <HeroContent>
                            <HeroTitle>Put Your Text Here</HeroTitle>
                            <HeroSubTitle>Put Your Text Here</HeroSubTitle>
                            <HeroDesc>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</HeroDesc>
                            <HeroAction>
                                <HeroButton to='/' >click</HeroButton>
                                <HeroButton to='/' className='inversed'>click</HeroButton>
                            </HeroAction>
                        </HeroContent>
                        <HeroImage >
                            <img src={heroImgSrc} alt="hero" />
                        </HeroImage>
                    </Grid>
                </Grid>
            </Container>
        </HeroWrapper>
    )
}
export default Hero;