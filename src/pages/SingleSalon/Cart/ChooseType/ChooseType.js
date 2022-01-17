import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const Choice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 15px;
    background-color: ${ props => props.theme.vars.theme };
    padding: 20px;
    color: ${ ( { theme } ) => theme.palette.common.white};
    cursor: pointer;
    &:last-child {
        margin-bottom: 0;
    }
    @media screen and (max-width: 599.98px) {
        padding: 10px;
    }
`

const ChooseType = props =>{

    const { handleChoosetype } = props;

    const {t} = useTranslation();


    return (
        <Wrapper>
            <Choice onClick={ ( ) => handleChoosetype('services') } >{t('services')}</Choice>
            <Choice onClick={ ( ) => handleChoosetype('deals') } >{t('deals')}</Choice>
        </Wrapper>
    )
}
export default ChooseType;