import { Card } from "@mui/material";
import { Fragment, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { AsyncPaginate } from 'react-select-async-paginate';
import { components } from 'react-select';

import axios from '../../../../../utils/axios-instance'
import ThemeContext from "../../../../../store/theme-context";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useCallback } from "react";
import ChooseCustomer from "./ChooseCustomer/ChooseCustomer";

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
    }
`

const CustomerSelectOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const CustomerSelectName = styled.h4`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.dark};
    transition: 0.3s ease-in-out;
    margin-bottom: 0px;
`
const CustomerSelectInfo = styled.ul`
    margin: 0;
    padding: 0;
    li {
        display: flex;
        align-items: center;
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.default};
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 0px;
        }
        svg {
            width: 16px;
            height: 16px;
            &.MuiSvgIcon-root  {
                margin:0;
                margin-right: 8px;
            }
        }
    }
`

const Option = (props) => {
    return (
        <Fragment>
            <components.Option {...props}>
                <CustomerSelectOption>
                    <CustomerSelectName>{props.children}</CustomerSelectName>
                    <CustomerSelectInfo>
                        <li><PhoneAndroidIcon sx={{ mr: 1 }} />{props.data.mobile}</li>
                    </CustomerSelectInfo>
                </CustomerSelectOption>
            </components.Option>
        </Fragment>
    );
};

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#000',
    }),
    control: base => ({
        ...base,
        height: 48,
    })
};

const Cart = props => {

    const { t } = useTranslation()

    const defaultCustomer = useMemo( () => {
        return {
            id: '',
            name: t('passing customer'),
        }
    }, [t])
    const [customerData, setCustomerData] = useState(defaultCustomer);



    const customerAddHandler = useCallback((val) => {
        setCustomerData(val)
    }, [])
    const customerDeleteHandler = useCallback(() => {
        setCustomerData(defaultCustomer)
    }, [defaultCustomer])

    return (
        <Wrapper>
            <ChooseCustomer customerData={customerData} chooseCustomer={customerAddHandler} deleteCustomer={customerDeleteHandler}  />
        </Wrapper>
    )
}
export default Cart;