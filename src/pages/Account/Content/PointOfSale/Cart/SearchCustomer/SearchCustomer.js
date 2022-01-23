import { useEffect, Fragment } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import ReactSelect, { components } from 'react-select';
import { searchCustomers } from '../../../../../../store/actions/index';
import ThemeContext from '../../../../../../store/theme-context';
import styled from 'styled-components';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useCallback } from 'react';

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#000',
    }),
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

    const { fetchedCustomers, searchCustomersHandler, selectCustomer, bookingCreated, reserved } = props;

    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [customerInput, setCustomerInput] = useState('');
    const [customer, setCustomer] = useState(null);

    const [options, setOptions] = useState([])

    const reset = useCallback(( ) => {
        setCustomerInput('');
        setCustomer(null);
    }, [])

    useEffect(() => {
        if ( bookingCreated || reserved ) {
            reset();
        }
    }, [bookingCreated, reserved, reset]);



    useEffect(() => {
        if (fetchedCustomers) {
            setOptions(fetchedCustomers.map(customer => {
                return {
                    value: customer.id,
                    label: customer.name,
                    mobile: customer.mobile,
                }
            }))
        }
    }, [fetchedCustomers])

    const handleSelectOptions = (value, actions) => {
        if (value.length !== 0) {
            setCustomerInput(value);
        }
    }

    useEffect(() => {
        if (customerInput.length !== 0) {
            const searchTimeout = setTimeout(() => {
                searchCustomersHandler(lang, customerInput)
            }, 1000)
            return () => clearTimeout(searchTimeout);
        }
    }, [customerInput, lang, searchCustomersHandler])

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
            const customerIndex = fetchedCustomers.findIndex(customer => customer.id === value.value);
            const updatedCustomerData = fetchedCustomers[customerIndex];
            setCustomer(value);
            selectCustomer(updatedCustomerData)
        } else {
            setCustomer(null)
        }
    }

    return (
        <ReactSelect styles={customStyles} options={options} isClearable isRtl={lang === 'ar'} filterOption={filterOption} components={{ Option }}
            value={customer} onChange={handleSelectCustomer} onInputChange={handleSelectOptions} />
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedCustomers: state.customers.posCustmers.customers,
        bookingCreated: state.bookings.bookingCreated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchCustomersHandler: (lang, word) => dispatch(searchCustomers(lang, word)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCustomer);