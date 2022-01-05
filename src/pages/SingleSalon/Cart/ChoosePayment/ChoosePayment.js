import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import cashImg from "../../../../images/pages/cart/cash.png";
import cardImg from "../../../../images/pages/cart/card.png";
import { formatCurrency } from "../../../../shared/utility";

const Wrapper = styled.div`

`

const InfoMessage = styled.div`
    text-align: center;
    margin-bottom: 30px;
    h5 {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 600;
        color :${ ( { theme } ) => theme.vars.theme };
    }
    p {
        font-size: 18px;
        line-height: 1.5;
        font-weight: 500;
        color :${ ( { theme } ) => theme.vars.theme };
    }
`

const PaymentMethod = styled.div`
    text-align: center;
    padding: 40px;
    border-radius: 20px;
    border: 1px solid;
    border-color: ${ ( { theme } ) => theme.vars.theme };
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 599.98px) {
        padding: 20px;
    }
    img {
        max-width: 100%;
        margin-bottom: 10px;
        object-fit: cover;
    }
    h5 {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 600;
        color :${ ( { theme } ) => theme.vars.theme };
        text-transform:capitalize;
    }
    `

const DepositPanel = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: rgba(150,36,142, 0.1);
    h6 {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 600;
        color :${ ( { theme } ) => theme.vars.theme };
        text-transform:capitalize;
    }
`

const ChoosePayment = props => {

    const { t } = useTranslation();

    return (
        <Wrapper>
            <InfoMessage>
                <h5>{t('When would you like to pay for the service?')}</h5>
                <p>{t('You can either pay now or pay locally on arrival. You will be able to select payment method in the next step.')}</p>
            </InfoMessage>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <PaymentMethod>
                        <img src={cashImg} alt='vector' />
                        <h5>{t('cash')}</h5>
                    </PaymentMethod>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <PaymentMethod>
                        <img src={cardImg} alt='vector' />
                        <h5>{t('credit card')}</h5>
                    </PaymentMethod>
                </Grid>
            </Grid>
            <DepositPanel>
                <h6>{`${t('Deposit amount :')} ${formatCurrency(10)}`}</h6>
            </DepositPanel>
        </Wrapper>
    )
}
export default ChoosePayment;