import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PushPinIcon from '@mui/icons-material/PushPin';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatCurrency } from '../../../shared/utility';
import { addToDeals, addToServices, resetCart } from '../../../store/actions';
import { CustomModal } from '../Modal/Modal';

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

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    svg {
        width: 120px;
        height: 120px;
        color: ${({ theme }) => theme.vars.primary};
        margin-bottom: 20px;
    }
    h4 {
        font-size: 17px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-bottom: 0;
    }
`


const SingleCard = props => {

    const { image, title, name, price, time, timeType, location, companyId, category, categoryId, type, id, addServiceHandler, addDealHandler, resetCartHandler, cart  } = props;

    const { t } = useTranslation();

    const navigate = useNavigate()
    const exisitongCompanyId = localStorage.getItem('cId')

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const handleClick = () => {
        navigate(`../salons/${companyId}`)
    }

    const addToCart = ( ) => {
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

    const handleCartClick = () => {
        if (!exisitongCompanyId) {
            localStorage.setItem('cId', companyId)
            addToCart()
        } else if ( exisitongCompanyId && (companyId ===  exisitongCompanyId)  ) {
            addToCart()
        } else  if ( exisitongCompanyId && (companyId !==  exisitongCompanyId) && ( cart.services.length === 0 || cart.desls.length === 0  ) ) {
            localStorage.setItem('cId', companyId)
            addToCart()
        } else if ( exisitongCompanyId && (companyId !==  exisitongCompanyId) && (  cart.services.length > 0 || cart.desls.length > 0  ) ) {
            setShowConfirmModal(true)
        }
    }

    const closeConfirmModal = ( ) => {
        setShowConfirmModal(false)
    }

    const confirmModalAcceptHandler = ( ) => {
        resetCartHandler()
        setTimeout( ( ) => {
            addToCart()
        }  , 500)
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
            <CustomModal show={showConfirmModal} heading='you have items from another company'  confirmText='delete' onConfirm={confirmModalAcceptHandler} onClose={closeConfirmModal} >
            <Content>
                <ErrorOutlineIcon />
                <h4>{t('you have items from another company and adding this item will remove them, do you want to procceed?')}</h4>
            </Content>
        </CustomModal>
        </Fragment>
    )
}

const mapStateToProps = (state)=> {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addServiceHandler: (data) => dispatch(addToServices(data)),
        addDealHandler: (data) => dispatch(addToDeals(data)),
        resetCartHandler: ( ) => dispatch(resetCart())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleCard);