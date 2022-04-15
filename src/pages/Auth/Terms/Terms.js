import { useTranslation } from "react-i18next";
import styled from 'styled-components'
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import v1 from '../../../utils/axios-instance-v1';
import Loader from "../../../components/UI/Loader/Loader";

const TermsBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 460px;
    min-width: 300px;
    background-color: ${({ theme }) => theme.palette.background.paper};
    color: #fff;
    padding: 60px 40px;
`

const TermsText = styled.div`
    padding: 0 20px;
    height: 400px;
    overflow: auto;
    font-size:14px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.primary};
    &::-webkit-scrollbar {
        width: 2px;
        background: #282828;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.vars.secondary};
    }
    h2 {
        text-transform: uppercase;
    }
`

const Terms = props => {
    
    const { open, handleClose } = props;
    const { t } = useTranslation()

    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        setLoading(true)
        v1.get('/terms-of-service')
            .then(res => {
                setData(res.data.terms)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    let content;

    if (loading) {
        content = <Loader height='300px' />
    }

    if (data && !loading) {
        content = (
            <TermsText>
                <h2>{t('Terms Of Services')}</h2>
                <p>{t('Last Edit: 04/13/2022')}</p>
                <p>{t('Grettings Users,')}</p>
                <p>{t('We are glad to see you here!')}</p>
                <p>{data}</p>
            </TermsText>
        )
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <TermsBox>
                {content}
            </TermsBox>
        </Modal>
    )
}
export default Terms;