import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import CartHeadliner from './CartHeadliner/CartHeadliner';
import ChooseType from './ChooseType/ChooseType';
import ChooseItem from './ChooseItem/ChooseItem';
import ChooseAppointment from './ChooseAppointment/ChooseAppointment';
import UserAuth from './UserAuth/UserAuth';
import ChoosePayment from './ChoosePayment/ChoosePayment';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        display:flex;
        margin: auto;
        overflow: hidden;
        box-shadow: none;
        border-radius:20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        z-index:1;
        @media screen and (max-width: 899.98px) {
            width: 90%;
        }
        @media screen and (min-width: 900px) {
            width: 70%;
        }
    }
`;

const CartContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
`
const CartBody = styled.div`
    flex-grow: 1;
    width: 100%;
    padding: 25px;
    max-height: 80vh;
    overflow-y: auto;
    // Scroll //
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        height: 7px;
        width: 8px;
        background-color: ${({ theme }) => theme.palette.divider};
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        margin-left: 2px;
        background: ${({ theme }) => theme.vars.primary};
        border-radius: 10px;
        cursor: pointer;
    }
`

const steps = ['Select type', 'select items', 'Select appointment', 'user infos', 'choose Payment'];

const Cart = props => {

    const {t} = useTranslation();

    const { show, onClose, salonData } = props;

    const [activeStep, setActiveStep] = useState(0);

    const [ selectedType , setSelectedType ] = useState('');

    const [ selectedItems , setSelectedItems ] = useState([]);

    const [ appointment , setAppointment ] = useState( new Date() );

    const [ paymentMethod , setPaumentMethod ] = useState('');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleChoosetype = useCallback((type) => {
        setSelectedType(type);
        setSelectedItems([]);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, [])

    const handleChooseItems = useCallback((item) => {
        setSelectedItems( prevState => {
            if ( prevState.indexOf(item.id) === -1 ) {
                return [...prevState, item.id]
            } else {
                const newState = prevState.filter( id => id !== item.id );
                return newState
            }
        } )
    }, [])

    const handleAppointment = useCallback((date) => {
        setAppointment(date);
    }, [])

    const handleChoosePayment = useCallback((payment) => {
        setPaumentMethod(payment);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, [])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={show}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Fade in={show}>
                <CustomCardMui>
                    <CartHeadliner activeStep={activeStep} salonNum={salonData.companyPhone} steps={steps} />
                    <CartContent sx={{ width: '100%' }}>
                        <CartBody>
                            {
                                activeStep === 0 && <ChooseType handleChoosetype={handleChoosetype} />
                            }
                            {
                                activeStep === 1 && <ChooseItem id={salonData.id} type={selectedType} onChoose={handleChooseItems} selectedItems={selectedItems} />
                            }
                            {
                                activeStep === 2 && <ChooseAppointment appointment={appointment} handleAppointment={handleAppointment} />
                            }
                            {
                                activeStep === 3 && <UserAuth />
                            }
                            {
                                activeStep === 4 && <ChoosePayment handlePayment={handleChoosePayment} />
                            }
                        </CartBody>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pb: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                {t('Back')}
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button color="secondary" onClick={handleNext}>
                                {t(activeStep === steps.length - 1 ? 'Finish' : 'Next')}
                            </Button>
                        </Box>
                    </CartContent>
                </CustomCardMui>
            </Fade>
        </Modal>
    )
}
export default Cart;