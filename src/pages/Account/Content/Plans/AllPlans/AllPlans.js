import { Container, Card, Button, Stack, Switch, Grid } from '@mui/material';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../../../utils/axios-instance';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../../shared/utility';
import { NavLink } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Loader from '../../../../../components/UI/Loader/Loader';

const PackagesWrapper = styled.div`
    padding: 30px 0 70px;
    background : ${(props) => props.theme.palette.background.default};
    @media screen and (max-width: 899.98px) {
        padding: 70px 0;
    }
`

const PricingPanel = styled(Card)`
    height: 100%;
    padding: 40px 30px 50px;
    margin-bottom: 35px;
    transition: all .35s ease-in-out;
    position: relative;
    border: 1px solid #f1f1f1;
    border-color: ${(props) => props.theme.palette.divider};;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .pricing-head {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        overflow: hidden;
        padding-bottom: 15px;
        border-bottom: 1px solid #f1f1f1;
        .pricing-name {
            font-size: 24px;
            font-weight: 500;
            line-height: 35px;
            text-transform: capitalize;
            color: #7d7b8f;
            margin-bottom: 26px;
        }
        .pricing-type {
            margin-bottom: 10px;
            text-align: center;
            .price {
                font-size: 45px;
                font-weight: 600;
                line-height: 68px;
                color: ${props => props.theme.palette.secondary.dark};
                margin-bottom: 0;
            }
            .per {
                font-size: 20px;
                font-weight: 500;
                line-height: 24px;
                color: #7d7b8f;
                text-transform: capitalize;
                margin-bottom: 0;
            }
        }
    }
    .pricing-body {
        text-align: center;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list-heading {
            font-size: 22px;
            font-weight: 500;
            line-height: 35px;
            text-transform: capitalize;
            color: #7d7b8f;
            margin-bottom: 26px;
        }
        .pricing-list {
            padding:0;
            margin-bottom: 35px;
            list-style: none;
            li {
                font-size: 18px;
                line-height: 22px;
                color: #7d7b8f;
                font-weight: 500;
                text-align: center;
                text-transform: capitalize;
                padding-bottom: 12px;
            }
        }
    }
`
const RecomendedSign = styled.div`
    margin-top: 15px;
    svg {
        width: 60px;
        height: 60px;
    }
`
const SwitcherLabel = styled.p`
    font-size: 16px;
    text-transform: capitalize;
    color: ${props => props.theme.palette.text.primary};
`

const AllPlans = ({ currentPlan }) => {

    const [isMonthly, setIsMonthly] = useState(true);

    const { t } = useTranslation();
    const [packages, setPackages] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        axios.get('/packages', {
            signal: controller.signal
        })
            .then(res => {
                setPackages(res.data.data);
            })
            .catch(err => {
                //console.log(err);
            })
        return () => {
            controller.abort();
        }
    }, [])

    const handleChange = (event) => {
        setIsMonthly(event.target.checked);
    };


    let content = (
        <Loader height='200px' />
    );
    if (packages) {
        let fetchedPackages = [...packages];
        content = (
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {
                        fetchedPackages.map((item, index) => {
                            return (
                                <Grid item key={item.id} xs={12} sm={6} md={4}>
                                    <PricingPanel>
                                        <div className="pricing-head">
                                            <div className="pricing-name">{t(item.name)}</div>
                                            <div className="pricing-type">
                                                <div className="price">{formatCurrency(isMonthly ? item.monthly_price : item.annual_price)}</div>
                                                <div className="per">{isMonthly ? t('per month') : t('per year')}</div>
                                            </div>
                                        </div>
                                        <div className="pricing-body">
                                            <div>
                                                <ul className="pricing-list">
                                                    <li>{`${t('max employees')} : ${item.max_employees}`}</li>
                                                    <li>{`${t('max services')} : ${item.max_services}`}</li>
                                                    <li>{`${t('max deals')} : ${item.max_services}`}</li>
                                                    <li>{`${t('max roles')} : ${item.max_services}`}</li>
                                                </ul>
                                                {item.package_modules && <h6 className="list-heading">{t('modules')}</h6>}
                                                <ul className="pricing-list">
                                                    {
                                                        item.package_modules?.map((feature, index) => {
                                                            return (
                                                                <li key={index}>{t(feature)}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                {item.id === currentPlan.id && (
                                                    <RecomendedSign><CheckCircleIcon color="success" /></RecomendedSign>
                                                )}
                                            </div>
                                            {item.id !== currentPlan.id && <Button variant='outlined' color="secondary">{t('Subscribe')}</Button>}
                                        </div>
                                    </PricingPanel>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        );
    }

    return (
        <PackagesWrapper>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent='center' sx={{ marginBottom: '20px' }} >
                <SwitcherLabel >{t('Yearly')}</SwitcherLabel>
                <Switch value={isMonthly} onChange={handleChange} defaultChecked color='secondary' inputProps={{ 'aria-label': 'ant design' }} />
                <SwitcherLabel>{t('Monthly')}</SwitcherLabel>
            </Stack>
            {content}
        </PackagesWrapper>
    )
}
export default AllPlans;
