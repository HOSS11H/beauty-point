
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import Mockup from '../../images/laptop.png';

const HeroWrapper = styled.div`
    display       : flex;
    align-items   : center;
    height        : 100vh;
    position: relative;
    @media screen and (max-width: 899.98px) {
        height        : auto;
        padding-top : 250px;
        text-align: center;
    }
    @media screen and (max-width: 599.98px) {
        padding-top : 200px;
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
    font-size: 22px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 26px;
    color: ${ ( { theme } ) => theme.vars.primary  };
    @media screen and (max-width: 767.98px) {
        font-size: 20px
    }
    `
const HeroTitle = styled.h1`
    font-size: 38px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 22px;
    color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.white : theme.vars.black };
    @media screen and (max-width: 767.98px) {
        font-size: 32px
    }
`
const HeroDesc = styled.p`
    font-size: 28px;
    font-weight: 700;
    text-transform: capitalize;
    margin-bottom: 44px;
    color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.white : theme.vars.black };
    @media screen and (max-width: 767.98px) {
        font-size: 24px
    }
`
const HeroButton = styled(NavLink)`
    font-size:20px;
    width: 150px;
    font-weight: 700;
    padding: 0 25px;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: ${ ( { theme } ) => theme.vars.primary  };
    color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.white : theme.vars.black };
    border:0;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
    transition: 0.3s ease-in-out;
    &:hover {
        color: ${ ( { theme } ) => theme.palette.mode === 'dark' ? theme.vars.black : theme.vars.white };
    }
`

const HeroImage = styled.div`
    max-width:700px;
    margin: 70px auto 0;
    @media screen and (min-width: 900px) {
        position: absolute;
        bottom: 0;
        right: 0;
        max-width: 50%;
        margin: 0;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        @media screen and (max-width: 699.98px) {
            aspect-ratio: 2.58;
        }
    }
`


const Hero = (  ) => {
    return (
        <HeroWrapper>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <HeroContent>
                            <HeroSubTitle>built by the crowd for the crowd</HeroSubTitle>
                            <HeroTitle>the leading digital donations platform in egypt</HeroTitle>
                            <HeroDesc>the leading digital donations platform in egypt</HeroDesc>
                            <HeroButton to='/posts' >Get started</HeroButton>
                        </HeroContent>
                        <HeroImage>
                            <img src={Mockup} alt='Laptop' />
                        </HeroImage>
                    </Grid>
                </Grid>
            </Container>
        </HeroWrapper>
    )
}
export default Hero;