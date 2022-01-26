import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PushPinIcon from '@mui/icons-material/PushPin';
import Typography from '@mui/material/Typography';
import styled, { keyframes } from 'styled-components';
import { formatCurrency } from '../../../shared/utility';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';

const CustomCard = styled(Card)`
    display: flex;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;;
    @media screen and (max-width: 599.98px) {
        flex-direction: column;
    }
    .card-img {
        flex-basis: 50%;
        flex-shrink: 0;
        height: 350px;
        @media screen and (max-width: 599.98px) {
            height: 200px;
            flex-basis: unset;
        }
        img {
            display: block;
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
    .card-content {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        flex-shrink: 0;
        padding-top: 25px;
        @media screen and ( max-width: 899.98px) {
            padding-top: 16px;
        }
        .card-title {
            margin-bottom: 35px;
            h1 {
                font-size: 34px;
                font-weight: 500;
                line-height: 1.1;
                margin-bottom: 10px;
                text-transform: capitalize;
                color: ${props => props.theme.palette.text.primary};
                @media screen and ( max-width: 899.98px) {
                    font-size: 24px;
                }
            }
            h2 {
                font-size: 24px;
                font-weight: 500;
                line-height: 1.1;
                text-transform: uppercase;
                color: ${props => props.theme.vars.primary};
                cursor: pointer;
                @media screen and ( max-width: 899.98px) {
                    font-size: 18px;
                }
            }
        }
    }
`
const Bounce = keyframes`
    0% {
        transform:         translateY(0px) translateX(-50%)
    }
    50% {
        transform:         translateY(5px) translateX(-50%)
    }
    100% {
        transform:         translateY(0px) translateX(-50%)
    }
`;

const Scale = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`

const CatButton = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${props => props.theme.vars.primary};
    color: ${props => props.theme.palette.text.primary};
    width: 60px;
    height: 60px;
    position: fixed;
    bottom: 40px;
    right: 50%;
    transform: translateX(50%);
    animation: ${Bounce} 1s ease-in-out infinite;
    cursor: pointer;
    z-index: 1500;
    @media screen and ( max-width: 899.98px) {
        width           : 50px;
        height          : 50px;
        bottom : 130px;
        right  : 15px;
        transform: translate(0);
        animation: ${Scale} 1s ease-in-out infinite;
    }
`

const SingleCard = props => {

    const { image, title, name, price, time, timeType, location, compnyId, category, categoryId, type, id } = props;

    const { t } = useTranslation();

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`../salons/${compnyId}`)
    }
    const handleCartClick = () => {
        if (type === 'service') {
            navigate(`../salons/${compnyId}?tab=cart&t=${type}&i=${id}&n=${title}&p=${price}`)
        } else if (type === 'deal') {
            navigate(`../salons/${compnyId}?tab=cart&t=${type}&i=${id}&n=${title}&p=${price}`)
        }
    }

    return (
        <Fragment>
            <CustomCard sx={{ display: 'flex' }}>
                <div className="card-img">
                    <img
                        src={image}
                        alt={title}
                    />
                </div>
                <div className='card-content' >
                    <CardContent className="card-content" sx={{ flex: '1 0 auto', }}>
                        {
                            category && (
                                <NavLink to={`../categories/${categoryId}`}>
                                    <Typography variant="h6" color="secondary" component="div" sx={{ marginBottom: '10px' }} >{category}</Typography>
                                </NavLink>
                            )
                        }
                        <div className="card-title" >
                            <h1>{title}</h1>
                            <h2 onClick={handleClick} >{name}</h2>
                        </div>
                        <Typography variant="h6" color="secondary" component="div" sx={{ marginBottom: '10px' }} >
                            {formatCurrency(price)}
                        </Typography>
                        <Typography component="div" variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                            <WatchLaterIcon sx={{ mr: 1, width: '15px', height: '15px' }} />{time} {t(timeType)}
                        </Typography>
                        <Typography component="div" variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PushPinIcon sx={{ mr: 1, width: '15px', height: '15px' }} />{location}
                        </Typography>
                    </CardContent>
                </div>
            </CustomCard>
            <CatButton onClick={handleCartClick} >
                <ShoppingCartIcon />
            </CatButton>
        </Fragment>
    )
}

export default SingleCard;