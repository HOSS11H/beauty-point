import { Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import iconSrc from '../../../../../images/pages/cart/icon.png';

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
                background-color: ${ ( { theme } ) => theme.palette.common.white};
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
const CartBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


const CartHeadliner = props => {

    const {t} = useTranslation();

    const { activeStep, salonName, steps } = props;

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
            <CartBody>
                <CartIcon src={iconSrc} />
                <CartHeading>
                    <h3>
                        { activeStep === 0 && t('select your services')}
                        { activeStep === 1 && t('select your services')}
                        { activeStep === 2 && t('confirm services')}
                        { activeStep === 3 && t('choose date and time')}
                        { activeStep === 5 && t('choose payment method')}
                        { activeStep === 6 && t('thank you for choosing us')}
                    </h3>
                    <p>
                        { activeStep === 0 && t('Please select services you want to schedule appointment for')}
                        { activeStep === 1 && `${t('Please select services you want from ')}${salonName}`}
                        { activeStep === 2 && `${t('that you want from ')}${salonName}`}
                        { activeStep === 3 && t('click on the date then choose the available time below')}
                        { activeStep === 4 && t('please provide your contact details to receive a confirmation and send you the appointment details')}
                        { activeStep === 5 && t('you can pay online with your mada card or pay cash on arrival')}
                    </p>
                </CartHeading>
            </CartBody>
        </CartHeadlinerWrapper>
    )
}
export default CartHeadliner;