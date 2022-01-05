import { Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import iconSrc from '../../../../images/pages/cart/icon.png';

const CartHeadlinerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 0 0 270px;
    background-color: ${({ theme }) => theme.vars.theme};
    border-radius: 20px 0 0 20px;
    padding: 15px 30px 25px 30px;
    text-align: center;
`

const ModalStepLabel = styled(StepLabel)`
    &.MuiStepLabel-root {
        padding: 0;
    }
    & .MuiStepLabel-iconContainer {
        padding-right: 15px;
        & .MuiSvgIcon-root {
            width: 33px;
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
`
const CartHeading = styled.div`
    margin-bottom: 30px;
    h3 {
        font-size: 28px;
        line-height: 40px;
        color: rgba(255, 255, 255, 1);
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
    }
    a {
        font-size: 17px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 1);
    }
`

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const CartHeadliner = props => {

    const {t} = useTranslation();

    const { activeStep, salonNum } = props;

    return (
        <CartHeadlinerWrapper>
            <Stepper activeStep={activeStep} sx={{ marginBottom: '20px' }} >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <ModalStepLabel {...labelProps}>{label}</ModalStepLabel>
                        </Step>
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