import { Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CustomModal } from "../Modal/Modal";
import { addToDeals, resetCart } from "../../../store/actions";
import { connect } from "react-redux";



const DealPanelCard = styled.div`
    border-radius: 25px;
    margin: 0 auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media screen and (max-width: 899.98px) {
        margin: 0 auto 0px;
        max-width: 370px
    }
    &:hover {
        .deal-img  {
            img {
                transform: scale(1.1);
            }
        }
    }
    .deal-img  {
        overflow: hidden;
        border-radius: 25px 25px 0 0;
        img {
            width: 100%;
            border-radius: 25px 25px 0 0;
            height: 250px;
            object-fit: cover;
            transition: 0.3s ease;
            @media screen and (max-width: 599.98px) {
                height: 200px;
            }
        }
    }
    .deal-content {
        background-color: ${({ theme }) => theme.palette.mode === "dark" ? "#000" : "#f7f7f7"};
        padding: 18px 20px 16px;
        border-radius: 0 0 25px 25px;
        .deal-title {
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
        .deal-salon {
            font-size: 19px;
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
        .deal-desc {
            font-size:17px;
            line-height:1.5;
            font-weight: 300;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 10px;
            @media screen and (max-width: 899.98px) {
                font-size: 14px;
                line-height: 1.5;
            }
        }
        .deal-discount {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            margin-left: 10px;
            @media screen and (max-width: 899.98px) {
                margin-right: 5px;
            }
            .discount-percent {
                display: flex;
                align-items: flex-end;
                font-size: 18px;
                line-height: 21px;
                font-weight: 300;
                color         : ${({ theme }) => theme.vars.secondary};
                @media screen and (max-width: 899.98px) {
                    font-size: 14px;
                    line-height: 1.5;
                }
                &.percentage {
                    align-items: center;
                }
                .discount-percent-sign {
                    font-size: 12px;
                    line-height: 14px;
                    font-weight: 500;
                    color         : ${({ theme }) => theme.vars.secondary};
                    text-transform: uppercase;
                    margin-left: 5px;
                    &.percentage {
                        font-size: 18px;
                        line-height: 21px;
                        margin-right: 0px;
                        @media screen and (max-width: 899.98px) {
                            font-size: 14px;
                            line-height: 1.5;
                        }
                    }
                }
            }
            .discount-text {
                font-size: 18px;
                line-height: 21px;
                font-weight: 300;
                color         : ${({ theme }) => theme.vars.secondary};
                text-transform: uppercase;
                @media screen and (max-width: 599.98px) {
                    font-size: 14px;
                    line-height: 1.5;
                }
            }
        }
        .deal-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
        }
        .deal-status {
            font-size: 16px;
            line-height: 21px;
            font-weight: 300;
            color: ${({ theme }) => theme.palette.text.primary};
            margin-bottom: 0;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 14px;
                line-height: 1.5;
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


const DealPanel = props => {

    const { deal, path, addDealHandler, resetCartHandler, cart } = props;

    const { t } = useTranslation()

    const navigate = useNavigate();

    const exisitingCompanyId = +localStorage.getItem('cId')

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const handleClick = () => {
        navigate(`${path}/${deal.id}`);
    }

    const addToCart = () => {
        addDealHandler({
            id: deal.id,
            name: deal.title,
            price: deal.price,
            companyId: deal.company.id,
            companyName: deal.company.companyName,
        })
    }

    const handleCartClick = () => {
        if (!exisitingCompanyId) {
            localStorage.setItem('cId', deal.company.id)
            addToCart()
        } else if (exisitingCompanyId && (deal.company.id === exisitingCompanyId)) {
            addToCart()
        } else if (exisitingCompanyId && (deal.company.id !== exisitingCompanyId) && (cart.services.length === 0 && cart.deals.length === 0)) {
            localStorage.setItem('cId', deal.company.id)
            addToCart()
        } else if (exisitingCompanyId && (deal.company.id !== exisitingCompanyId) && (cart.services.length > 0 || cart.deals.length > 0)) {
            setShowConfirmModal(true)
        }
    }

    const closeConfirmModal = () => {
        setShowConfirmModal(false)
    }

    const confirmModalAcceptHandler = () => {
        resetCartHandler()
        setTimeout(() => {
            localStorage.setItem('cId', deal.company.id)
            addToCart()
            setShowConfirmModal(false)
        }, 500)
    }


    return (
        <>
            <DealPanelCard  >
                <div className="deal-img">
                    <img src={deal.image} alt="spotlight" />
                </div>
                <div className="deal-content">
                    <h3 className="deal-title" onClick={handleClick} >{deal.title}</h3>
                    <h3 className="deal-salon">{deal.company?.companyName}</h3>
                    <p className="deal-desc">
                        {deal.applied_between_time}
                    </p>
                    <div className="deal-body">
                        <div className="deal-discount">
                            <h5 className={`discount-percent ${deal.discount_type === 'percentage' && 'percentage'} `}  >
                                <span>{deal.discount_value}</span>
                                <span className={`discount-percent-sign ${deal.discount_type === 'percentage' && 'percentage'} `}>{deal.discount_type === 'percentage' ? '%' : 'SAR'}</span>
                            </h5>
                            <h6 className="discount-text" >off</h6>
                        </div>
                        <p className="deal-status">{t(deal.status)}</p>
                    </div>
                    <CatButton onClick={handleCartClick} >
                        {t('Add to Cart')}
                        <ShoppingCartIcon />
                    </CatButton>
                </div>
            </DealPanelCard>
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
        addDealHandler: (data) => dispatch(addToDeals(data)),
        resetCartHandler: () => dispatch(resetCart())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DealPanel);