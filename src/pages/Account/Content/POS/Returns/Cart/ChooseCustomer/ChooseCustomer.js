import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Fragment } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const CustomerCard = styled.div`
    padding:  0 10px 4px;
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
    height: 48px;
    display: flex;
    flex-direction: column;
    justify-content:center;
`
const CustomerName = styled.h4`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.main};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
`
const CustomerInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 18px;
            height: 18px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`


const ChooseCustomer = props => {

    const { customerData} = props;

    const { t } = useTranslation()

    let content =  <CustomerName>{t('No Order Selected')}</CustomerName>;

    if ( customerData ) {
        content = (
            <Fragment>
                <CustomerName>{customerData.name}</CustomerName>
                {customerData.mobile && (
                    <CustomerInfo>
                        <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customerData.mobile}</li>
                    </CustomerInfo>
                )}
            </Fragment>
        )
    }

    return (
        <CustomerCard>
            {content}
        </CustomerCard>
    )
}
export default ChooseCustomer;