import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Card, Container, Grid, Stack, Switch } from '@mui/material';
import axios from 'axios';
import CryptoJS from "crypto-js";
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loader from '../../../../../components/UI/Loader/Loader';
import { formatCurrency } from '../../../../../shared/utility';
import AuthContext from '../../../../../store/auth-context';
import v2 from '../../../../../utils/axios-instance';
import v1 from '../../../../../utils/axios-instance-v1';
import config from '../configuration.json';

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

/* const generateHashSHA256 = (hashSequence) => {
    // hashSequence = trackid | terminalId | password | secret | amount | currency
    let hash = CryptoJS.SHA256(hashSequence).toString()
    return hash;
} */

const AllPlans = ({ currentPlanId }) => {

    const authCtx = useContext(AuthContext)

    const { roleName } = authCtx;

    const navigate = useNavigate();

    const [isMonthly, setIsMonthly] = useState(true);

    const { t } = useTranslation();
    const [packages, setPackages] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const getCompanyData = v1.get('/vendors/settings/company')
        const getPackages = v2.get(`/packages${  roleName === 'artist' ? '?type=artist' : ''}` );
        axios.all([getCompanyData, getPackages], {
            signal: controller.signal
        })
            .then(axios.spread((companyData, packagesData) => {
                setPackages(packagesData.data.data);
                setCompanyData(companyData.data);
            }))
            .catch(error => {
                console.log(error);
            });
        return () => {
            controller.abort();
        }
    }, [roleName]);

    const handleChange = (event) => {
        setIsMonthly(event.target.checked);
    };

    const handleSubscribe = (planInfo) => {
        v2.post('/plans/redirect_url', {
            packageId: planInfo.id,
            isMonthly: isMonthly,
            callback_url: "https://beautypoint.sa/account/plans/status",
        })
            .then(res => {
                window.location.assign(res.data.redirect_url);
            })
            .catch(error => {
                navigate('/account/plans')
                toast.error('Something went wrong', {
                    position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                    closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                });
            }
            );
    }


    let content = (
        <Loader height='200px' />
    );
    if (packages && companyData) {
        let fetchedPackages = [...packages];
        content = (
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {
                        fetchedPackages.map((plan, index) => {
                            return (
                                <Grid item key={plan.id} xs={12} sm={6} md={6}  lg={4} >
                                    <PricingPanel>
                                        <div className="pricing-head">
                                            <div className="pricing-name">{t(plan.name)}</div>
                                            <div className="pricing-type">
                                                <div className="price">{formatCurrency(isMonthly ? plan.monthly_price : plan.annual_price)}</div>
                                                <div className="per">{isMonthly ? t('per month') : t('per year')}</div>
                                            </div>
                                        </div>
                                        <div className="pricing-body">
                                            <div>
                                                <ul className="pricing-list">
                                                    <li>{`${t('max employees')} : ${plan.max_employees}`}</li>
                                                    <li>{`${t('max services')} : ${plan.max_services}`}</li>
                                                    <li>{`${t('max deals')} : ${plan.max_deals}`}</li>
                                                    <li>{`${t('max roles')} : ${plan.max_roles}`}</li>
                                                </ul>
                                                {plan.package_modules && <h6 className="list-heading">{t('modules')}</h6>}
                                                <ul className="pricing-list">
                                                    {
                                                        plan.package_modules?.map((feature, index) => {
                                                            return (
                                                                <li key={index}>{t(feature)}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                                {plan.id === currentPlanId && (
                                                    <RecomendedSign><CheckCircleIcon color="success" /></RecomendedSign>
                                                )}
                                            </div>
                                            {plan.id !== currentPlanId && <Button onClick={handleSubscribe.bind(null, plan)} variant='outlined' color="secondary">{t('Subscribe')}</Button>}
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
