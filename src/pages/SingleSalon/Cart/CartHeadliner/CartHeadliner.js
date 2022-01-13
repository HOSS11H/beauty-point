import { Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import iconSrc from '../../../../images/pages/cart/icon.png';

const CartHeadlinerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.vars.theme};
    border-radius: 20px 0 0 20px;
    padding: 15px 30px 25px 30px;
    text-align: center;
    height:100%;
    @media screen and (max-width: 1999.98px) {
        flex: 0 1 35%;
        padding-left: 20px;
        padding-right: 20px;
    }
    @media screen and (max-width: 899.98px) {
        border-radius: 20px 20px 0 0;
        padding-left: 30px;
        padding-right: 30px;
        display: none;
    }
`

const CustomStep = styled(Step)`
    &.MuiStep-root {
        padding: 0 3px;
    }
`

const ModalStepLabel = styled(StepLabel)`
    &.MuiStepLabel-root {
        padding: 0;
    }
    & .MuiStepLabel-iconContainer {
        & .MuiSvgIcon-root {
            width: 20px;
            height: 4px;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 4px;
            color: transparent;
            &.Mui-active {
                background-color: #fff;
            }
            & .MuiStepIcon-text {
                display: none;
            }
        }
    }
    & .MuiStepLabel-label {
        display: none;
    }
`
const CartIcon = styled.img`
    max-width:90px;
    margin-top: 20px;
    margin-bottom: 20px;
    @media screen and (max-width: 899.98px) {
        max-width: 50px;
        margin: 10px 0;
    }
`
const CartHeading = styled.div`
    margin-bottom: 30px;
    @media screen and (max-width: 899.98px) {
        margin-bottom: 20px;
    }
    h3 {
        font-size: 28px;
        line-height: 40px;
        color: rgba(255, 255, 255, 1);
        @media screen and (max-width: 899.98px) {
            font-size: 20px;
            line-height: 1.5;
        }
    }
    p {
        font-size: 17px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 1);
    }
`
const CartContact = styled.div`
    h4 {
        font-size: 20px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 1);
        @media screen and (max-width: 899.98px) {
            font-size: 18px;
        }
    }
    a {
        font-size: 17px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 1);
    }
`


const CartHeadliner = props => {

    const {t} = useTranslation();

    const { activeStep, salonNum, steps } = props;

    return (
        <CartHeadlinerWrapper>
            <Stepper activeStep={activeStep} sx={{ marginBottom: '15px' }} >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <CustomStep key={label} {...stepProps}>
                            <ModalStepLabel {...labelProps}>{label}</ModalStepLabel>
                        </CustomStep>
                    );
                })}
            </Stepper>
            <CartIcon src={iconSrc} />
            <CartHeading>
                <h3>{t('select your services')}</h3>
                <p>{t('Please select a service you want to schedule appointment for')}</p>
            </CartHeading>
            <CartContact>
                <h4>{t('Question ?')}</h4>
                <a href={`tel:${salonNum}`}>{salonNum}</a>
            </CartContact>
        </CartHeadlinerWrapper>
    )
}
export default CartHeadliner;