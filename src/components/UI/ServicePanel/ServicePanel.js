import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { formatCurrency } from '../../../shared/utility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToServices, resetCart } from '../../../store/actions';
import { connect } from 'react-redux';
import { useState } from 'react';
import { CustomModal } from '../Modal/Modal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ServicePanelCard = styled.div`
    border-radius: 25px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 0px;
        max-width: 370px
    }
    &:hover {
        .service-img  {
            img {
                transform: scale(1.1);
            }
        }
    }
    .service-img  {
        height: 200px;
        overflow: hidden;
        border-radius: 25px 25px 0 0;
        img {
            width: 100%;
            height: 100%;
            border-radius: 25px 25px 0 0;
            object-fit: cover;
            transition: 0.3s ease;
            @media screen and (max-width: 899.98px) {
                height: 200px;
            }
        }
    }
    .service-content {
        background-color: #F7F7F7;
        background-color: ${({ theme }) => theme.palette.mode === "dark" ? "#000" : "#f7f7f7"};
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .service-title {
            font-size: 22px;
            line-height:1.5;
            font-weight: 500;
            color         : ${({ theme }) => theme.vars.secondary};
            margin-bottom:0;
            text-transform: capitalize;
            @media screen and (max-width: 899.98px) {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color         : ${({ theme }) => theme.vars.secondary};
            }
        }
        .service-salon {
            font-size: 18px;
            line-height:1.5;
            font-weight: 500;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom:0;
            text-transform: capitalize;
            margin-bottom: 15px;
            @media screen and (max-width: 899.98px) {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color: ${({ theme }) => theme.palette.text.primary};
            }
        }
        .service-price {
            font-size:17px;
            line-height:1.5;
            font-weight: 300;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 30px;
            @media screen and (max-width: 899.98px) {
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 20px;
            }
            &:last-child {
                margin-bottom: 0;
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

const ServicePanel = props => {

    const { service, path, addServiceHandler, resetCartHandler, cart } = props;

    const navigate = useNavigate();
    const { t } = useTranslation()

    const exisitingCompanyId = +localStorage.getItem('cId')

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const handleClick = () => {
        navigate(`${path}/${service.id}`)
    }

    const addToCart = ( ) => {
        addServiceHandler({
            id: service.id,
            name:  service.name,
            price:  service.price,
            companyId:  service.company.id,
            companyName: service.company.companyName,
        })
    }

    const handleCartClick = () => {
        if (!exisitingCompanyId) {
            localStorage.setItem('cId', service.company.id)
            addToCart()
        } else if ( exisitingCompanyId && (service.company.id ===  exisitingCompanyId)  ) {
            addToCart()
        } else  if ( exisitingCompanyId && (service.company.id !==  exisitingCompanyId) && ( cart.services.length === 0 && cart.deals.length === 0  ) ) {
            localStorage.setItem('cId', service.company.id)
            addToCart()
        } else if ( exisitingCompanyId && (service.company.id !==  exisitingCompanyId) && (  cart.services.length > 0 || cart.deals.length > 0  ) ) {
            setShowConfirmModal(true)
        }
    }

    const closeConfirmModal = ( ) => {
        setShowConfirmModal(false)
    }
    
    const confirmModalAcceptHandler = ( ) => {
        resetCartHandler()
        setTimeout( ( ) => {
            localStorage.setItem('cId', service.company.id)
            addToCart()
            setShowConfirmModal(false)
        }  , 500)
    }

    return (
        <>
            <ServicePanelCard >
                <div className="service-img">
                    <img src={service.image} alt="service" />
                </div>
                <div className="service-content">
                    <h3 onClick={handleClick} className="service-title">{service.name}</h3>
                    <h3 className="service-salon">{service.company?.companyName}</h3>
                    <p className="service-price">
                        {formatCurrency(service.price)}
                    </p>
                    <CatButton onClick={handleCartClick} >
                        {t('Add to Cart')}
                        <ShoppingCartIcon />
                    </CatButton>
                </div>
            </ServicePanelCard>
            <CustomModal show={showConfirmModal} heading='you have items from another company' confirmText='delete' onConfirm={confirmModalAcceptHandler} onClose={closeConfirmModal} >
                <Content>
                    <ErrorOutlineIcon />
                    <h4>{t('you have items from another salon / artist and adding this item will remove them, do you want to procceed?')}</h4>
                </Content>
            </CustomModal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addServiceHandler: (data) => dispatch(addToServices(data)),
        resetCartHandler: () => dispatch(resetCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePanel);