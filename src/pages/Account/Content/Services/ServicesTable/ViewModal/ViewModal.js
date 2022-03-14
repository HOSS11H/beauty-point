import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import DOMPurify from "dompurify";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import axios from '../../../../../../utils/axios-instance';
import ThemeContext from '../../../../../../store/theme-context';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../../../../../components/UI/Loader/Loader';

const ServiceImg = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`
const ServiceData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const ServiceDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`

const ServiceDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const ServiceDesc = styled.div`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    p {
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
`



const ViewModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [loading, setLoading] = useState(false);
    const [serviceData, setServiceData] = useState(null);
    
    const fetchData = useCallback(( ) => {
        setLoading(true);
        axios.get(`/vendors/services/${id}?&include[]=category&include[]=location`, {
            headers: {
                'Accept-Language': lang
            }
        }).then(response => {
            setServiceData(response.data);
            setLoading(false);
        })
            .catch(err => {
                setLoading(false);
                toast.error(t('Error Happened'), {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            })
    }, [id, lang, t])

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [fetchData, id]);

    let content;

    if (loading) {
        content = <Loader height='50vh' />
    }

    if (serviceData && !loading) {
        const mySafeHTML = DOMPurify.sanitize(serviceData.description);
        content = (
            <Grid container  spacing={2}>
                <Grid item xs={12} md={6}>
                    <ServiceImg>
                        <img src={serviceData.image} alt="service" />
                    </ServiceImg>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ServiceData>
                                <ServiceDataHeading>{t('service name')}</ServiceDataHeading>
                                <ServiceDataInfo>{serviceData.name}</ServiceDataInfo>
                            </ServiceData>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceData>
                                <ServiceDataHeading>{t('location')}</ServiceDataHeading>
                                <ServiceDataInfo>{serviceData.location.name}</ServiceDataInfo>
                            </ServiceData>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceData>
                                <ServiceDataHeading>{t('category')}</ServiceDataHeading>
                                <ServiceDataInfo>{serviceData.category.name}</ServiceDataInfo>
                            </ServiceData>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceData>
                                <ServiceDataHeading>{t('discount type')}</ServiceDataHeading>
                                <ServiceDataInfo>{serviceData.discount_type}</ServiceDataInfo>
                            </ServiceData>
                        </Grid>
                        <Grid item xs={6}>
                            <ServiceData>
                                <ServiceDataHeading>{t('discount price')}</ServiceDataHeading>
                                <ServiceDataInfo>{serviceData.discount} {serviceData.discount_type === 'percent' ? '%' : 'ريال' }</ServiceDataInfo>
                            </ServiceData>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ServiceData>
                        <ServiceDataHeading>{t('description')}</ServiceDataHeading>
                        <ServiceDesc dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
                    </ServiceData>
                </Grid>
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default ViewModal;