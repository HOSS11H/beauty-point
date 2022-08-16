import { useEffect, Fragment } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import ReactSelect, { components } from 'react-select';
import ThemeContext from '../../../../../../store/theme-context';
import axios from '../../../../../../utils/axios-instance';
import styled from 'styled-components';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#000',
    }),
    control: base => ({
        ...base,
        height: 56,
    })
};

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

const SearchCustomer = props => {

    const { t } = useTranslation();

    const { selectCustomer, resetSearchData } = props;

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [customers, setCustomers] = useState([])
    const [customerInput, setCustomerInput] = useState('');
    const [customer, setCustomer] = useState(null);

    const [options, setOptions] = useState([])

    const reset = useCallback(() => {
        setCustomerInput('');
        setCustomer(null);
    }, [])

    useEffect(() => {
        if (resetSearchData) {
            reset();
        }
    }, [reset, resetSearchData]);



    useEffect(() => {
        if (customers) {
            setOptions(customers.map(customer => {
                return {
                    value: customer.id,
                    label: customer.name,
                    mobile: customer.mobile,
                }
            }))
        }
    }, [customers])

    const handleSelectOptions = (value, actions) => {
        if (value.length !== 0) {
            setCustomerInput(value);
        }
    }

    useEffect(() => {
        if (customerInput.length !== 0 && customerInput.length >= 3) {
            const searchTimeout = setTimeout(() => {
                axios.get(`vendors/customers?term=${customerInput}`, {
                    headers: {
                        'Accept-Language': lang
                    }
                }).then(response => {
                    setCustomers(response.data.data)
                })
                    .catch(err => {
                        console.log(err)
                    })
            }, 1000)
            return () => clearTimeout(searchTimeout);
        }
    }, [customerInput, lang])

    const filterOption = (option, inputValue) => {
        if (option.data?.mobile?.includes(inputValue)) {
            return true
        }
        if (option.label.toLowerCase().includes(inputValue.toLowerCase())) {
            return true
        }
    }

    const handleSelectCustomer = (value, actions) => {
        if (value) {
            const customerIndex = customers.findIndex(customer => customer.id === value.value);
            const updatedCustomerData = customers[customerIndex];
            setCustomer(value);
            selectCustomer(updatedCustomerData)
        } else {
            setCustomer(null)
        }
    }

    return (
        <Fragment>
            <ReactSelect styles={customStyles} options={options} isClearable isRtl={lang === 'ar'}
                placeholder={t('select customer')} filterOption={filterOption} components={{ Option }}
                value={customer} onChange={handleSelectCustomer} onInputChange={handleSelectOptions} />
            <ValidationMessage exist>{t('write at least 3 chars')}</ValidationMessage>
        </Fragment>
    )
}

export default SearchCustomer;