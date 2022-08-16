import styled from "styled-components";
import axios from '../../../../../../utils/axios-instance'
import ThemeContext from "../../../../../../store/theme-context";
import { Fragment, useContext, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { AsyncPaginate } from 'react-select-async-paginate';
import { components } from 'react-select';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useCallback } from "react";
import { IconButton } from "@mui/material";


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

const CustomerCard = styled.div`
    padding:  0 10px 4px;
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
    height: 48px;
    display: flex;
    justify-content:space-between;
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

const ChooseCustomer = props => {

    const { customerData, chooseCustomer, deleteCustomer } = props;

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [loadedCustomers, setLoadedCustomers] = useState([])
    const [customer, setCustomer] = useState(null);

    const loadOptions = useCallback(async (inputValue) => {
        if (inputValue === '') return {
            options: []
        };
        let token = localStorage.getItem('token');
        const response = await fetch(`${axios.defaults.baseURL}/vendors/customers?term=${inputValue}`, {
            headers: {
                'Accept-Language': lang,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token !== null ? 'Bearer ' + token : null,
            },
        });
        const responseJSON = await response.json();
        const formattedData = responseJSON.data.map(customer => {
            return {
                value: customer.id,
                label: customer.name,
                mobile: customer.mobile,
            }
        })
        setLoadedCustomers(formattedData)
        return {
            options: formattedData,
        };
    }, [lang])

    const handleSelectCustomer = (value, actions) => {
        if (value) {
            setCustomer(value);
            const customerIndex = loadedCustomers.findIndex(customer => customer.value === value.value);
            const updatedCustomerData = loadedCustomers[customerIndex];
            chooseCustomer(updatedCustomerData)
        } else {
            setCustomer(null)
        }
    }

    const filterOption = (option, inputValue) => {
        if (option.data?.mobile?.includes(inputValue)) {
            return true
        }
        if (option.label.toLowerCase().includes(inputValue.toLowerCase())) {
            return true
        }
    }

    const removeCustomer = ( ) => {
        setCustomer(null)
        deleteCustomer()
    }

    if (customerData && customerData.id !== '') {
        return (
            <CustomerCard>
                <div>
                    <CustomerName>{customerData.label}</CustomerName>
                    {
                        customerData.mobile && (
                            <CustomerInfo>
                                <li><PhoneAndroidIcon sx={{ mr: 1 }} />{customerData.mobile}</li>
                            </CustomerInfo>
                        )
                    }
                </div>
                <IconButton onClick={removeCustomer} >
                    <CloseIcon />
                </IconButton>
            </CustomerCard>
        )
    }

    return (
        <AsyncPaginate
            cacheOptions
            debounceTimeout={500}
            loadOptions={loadOptions}
            components={{ Option }}
            styles={customStyles} isClearable isRtl={lang === 'ar'}
            value={customer} onChange={handleSelectCustomer}
            filterOption={filterOption}
        />
    )
}
export default ChooseCustomer;