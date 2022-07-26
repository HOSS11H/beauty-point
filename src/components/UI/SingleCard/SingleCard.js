import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import PushPinIcon from '@mui/icons-material/PushPin';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { formatCurrency } from '../../../shared/utility';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { addToDeals, addToServices } from '../../../store/actions';
import { connect } from 'react-redux';
import { Button } from '@mui/material';

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

const CatButton = styled(Button)`
    &.MuiButton-root {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.theme.vars.primary};
        color: ${props => props.theme.palette.common.white};
        width: max-content;
        margin-top: 20px;
        &:hover {
            background-color: ${props => props.theme.vars.primary};
        }
        & .MuiSvgIcon-root {
            margin-left: 5px;
        }
    }
`

const SingleCard = props => {

    const { image, title, name, price, time, timeType, location, companyId, category, categoryId, type, id, addServiceHandler, addDealHandler } = props;

    const { t } = useTranslation();

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`../salons/${companyId}`)
    }
    const handleCartClick = () => {
        if (type === 'service') {
            addServiceHandler({
                    id: id,
                    name: title,
                    price,
                    companyId,
                    companyName: name,
            })
        } else if (type === 'deal') {
            addDealHandler({
                    id: id,
                    name: title,
                    price,
                    companyId,
                    companyName: name,
            })
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
                        <CatButton onClick={handleCartClick} >
                            {t('Add to Cart')}
                            <ShoppingCartIcon />
                        </CatButton>
                    </CardContent>
                </div>
            </CustomCard>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addServiceHandler: (data) => dispatch(addToServices(data)),
        addDealHandler: (data) => dispatch(addToDeals(data)),
    }
}


export default connect(null, mapDispatchToProps)(SingleCard);