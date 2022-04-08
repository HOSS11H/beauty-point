import DiscountIcon from '@mui/icons-material/Discount';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Card from '@mui/material/Card';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { formatCurrency } from '../../../../shared/utility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import moment from 'moment';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        display:block;
        max-width: 100%;
        margin: auto;
        overflow: hidden;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius:20px;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        position: relative;
        cursor: pointer;
    }
`
const CouponStatus = styled.div`
    display: inline-flex;
    padding: 10px 15px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
    margin-top: 15px;
    ${ ( { active } ) => active && css`
        background-color: ${ ( { theme } ) => theme.palette.success.main};
    `}
    ${ ( { inactive } ) => inactive && css`
        background-color: ${ ( { theme } ) => theme.palette.error.main};
    `}
`
const CouponName = styled.a`
    display: block;
    font-size: 18px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    cursor: pointer;
`
const CouponInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height:1.7;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 20px;
            height: 20px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`

const CouponCard = props => {

    const  { t } = useTranslation()

    const { coupon, onClick } = props;

    let discount;

    if (coupon.discountType === 'percentage') {
        discount = `${coupon.amount}%`
    } else if (coupon.discountType === 'amount') {
        discount = `${formatCurrency(coupon.amount)}`
    }

    return (
        <Fragment>
            <CustomCardMui onClick={onClick.bind(null, coupon)} >
                    <CouponName>{coupon.title}</CouponName>
                    <CouponInfo>
                        <li><QrCodeIcon sx={{ mr: 1 }} />{`${t('code: ')}${coupon.code}`}</li>
                        <li><DiscountIcon sx={{ mr: 1 }} />{`${t('discount: ')}${discount}`}</li>
                        <li><DateRangeIcon sx={{ mr: 1 }} />{`${t('start date: ')}${moment.utc(coupon.startDateTime).format('YYYY-MM-DD')}`}</li>
                        {coupon.endDateTime && <li><DateRangeIcon sx={{ mr: 1 }} />{`${t('end date: ')}${moment.utc(coupon.endDateTime).format('YYYY-MM-DD')}`}</li>}
                    </CouponInfo>
                    <CouponStatus active={coupon.status === 'active'} inactive={coupon.status === 'inactive'}  >
                        {coupon.status}
                    </CouponStatus>
            </CustomCardMui>
        </Fragment>
    )
}
export default CouponCard;