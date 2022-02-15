import { useEffect, Fragment } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import ReactSelect, { components } from 'react-select';
import ThemeContext from '../../../../../../store/theme-context';
import axios from '../../../../../../utils/axios-instance';
import styled from 'styled-components';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

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

const BankSelectOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const BankSelectName = styled.h4`
    display: block;
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.primary.dark};
    transition: 0.3s ease-in-out;
    margin-bottom: 0px;
`
const BankSelectInfo = styled.ul`
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
                <BankSelectOption>
                    <BankSelectName>{props.children}</BankSelectName>
                    <BankSelectInfo>
                        <li><AccountBalanceIcon sx={{ mr: 1 }} />{props.data.account}</li>
                    </BankSelectInfo>
                </BankSelectOption>
            </components.Option>
        </Fragment>
    );
};

const SearchBanks = props => {

    const {t} = useTranslation();

    const { selectBank, resetSearchData } = props;


    const themeCtx = useContext(ThemeContext);
    const { lang } = themeCtx;

    const [banks, setBanks] = useState([])
    const [bankInput, setBankInput] = useState('');
    const [bank, setBank] = useState(null);

    const [options, setOptions] = useState([])

    const reset = useCallback(() => {
        setBankInput('');
        setBank(null);
    }, [])

    useEffect(() => {
        if (resetSearchData) {
            reset();
        }
    }, [reset, resetSearchData]);



    useEffect(() => {
        if (banks) {
            setOptions(banks.map(bank => {
                return {
                    value: bank.id,
                    label: bank.name,
                    account: bank.account,
                }
            }))
        }
    }, [banks])

    const handleSelectOptions = (value, actions) => {
        if (value.length !== 0) {
            setBankInput(value);
        }
    }

    useEffect(() => {
        if (bankInput.length !== 0) {
            const searchTimeout = setTimeout(() => {
                axios.get(`vendors/banks?term=${bankInput}`, {
                    headers: {
                        'Accept-Language': lang
                    }
                }).then(response => {
                    setBanks(response.data.data)
                })
                    .catch(err => {
                        console.log(err)
                    })
            }, 1000)
            return () => clearTimeout(searchTimeout);
        }
    }, [bankInput, lang])

    const filterOption = (option, inputValue) => {
        if (option.data?.account?.includes(inputValue)) {
            return true
        }
        if (option.label.toLowerCase().includes(inputValue.toLowerCase())) {
            return true
        }
    }

    const handleSelectBank = (value, actions) => {
        if (value) {
            const bankIndex = banks.findIndex(bank => bank.id === value.value);
            const updatedBankData = banks[bankIndex];
            setBank(value);
            selectBank(updatedBankData)
        } else {
            setBank(null)
        }
    }

    return (
        <ReactSelect styles={customStyles} options={options} isClearable isRtl={lang === 'ar'} 
            placeholder={t('select bank')} filterOption={filterOption} components={{ Option }}
            value={bank} onChange={handleSelectBank} onInputChange={handleSelectOptions} />
    )
}

export default SearchBanks;