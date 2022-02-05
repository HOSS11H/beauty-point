import styled from 'styled-components';
import Card from '@mui/material/Card';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Fragment } from 'react';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        max-width: 100%;
        margin: auto;
        overflow: hidden;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius:20px;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        display: flex;
        position: relative;
        cursor: pointer;
        @media screen and (max-width: 889.98px) {
            flex-direction: column;
            justify-content: center;
        }
    }
`
const CustomerImg = styled(Avatar)`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-right: 20px;
    @media screen and  (max-width: 899.98px) {
        width: 40px;
        height: 40px;
        margin-right: 0px;
        margin-bottom: 15px;
    }
    cursor: pointer;
`

const BookingContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`
const CustomerName = styled.a`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    cursor: pointer;
`
const CustomerInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
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

const CustomerCard = props => {

    const { customer, onClick } = props;

    return (
        <Fragment>
            <CustomCardMui onClick={onClick.bind(null, customer)} >
                <CustomerImg >
                    <PersonIcon />
                </CustomerImg>
                <BookingContent>
                    <CustomerName>{customer.name}</CustomerName>
                    <CustomerInfo>
                        {customer.email && <li><MailIcon sx={{ mr: 1 }} />{customer.email}</li>}
                        {customer.mobile && <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customer.mobile}</li>}
                    </CustomerInfo>
                </BookingContent>
            </CustomCardMui>
        </Fragment>
    )
}
export default CustomerCard;