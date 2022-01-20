import { Container, Card, Button, Stack, Switch } from '@mui/material';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from '../../../utils/axios-instance';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import HomeLayout from '../../../components/HomeLayout/HomeLayout';
import { formatCurrency } from '../../../shared/utility';
import { NavLink } from 'react-router-dom';

const PackagesWrapper = styled.div`
    padding: 100px 0;
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

const Loader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 200px;
`

const PricingTable = styled.div`
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
    border-radius: 6px;
`
const PricingMain = styled.div`
    flex-basis: 25%;;
    flex-shrink: 0;
`
const PricingColumn = styled.div`
    flex-basis: 25%;
    flex-shrink: 0;
`
const PricingHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 150px;
    padding: 25px;
    background-color: ${({ theme }) => theme.palette.grey[300]};
    font-size: 25px;
    font-weight: 500;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.common.black};
    text-transform: capitalize;
`
const Wrapper = styled.div``

const PricingCell = styled.div`
    display: flex;
    align-items: center;
    height: 44px;
    padding: 10px;
    font-size:  17px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.common.black};
    background-color: ${({ theme }) => theme.palette.grey[300]};
    &:nth-child(odd) {
        background-color: ${({ theme }) => theme.palette.common.white};
    }
`
const PricingName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 25px;
    background-color: ${({ theme }) => theme.palette.grey[300]};
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    color: ${({ theme }) => theme.palette.common.black};
    text-transform: capitalize;
`
const PricingPrice = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    padding: 25px;
    background-color: ${({ theme }) => theme.palette.grey[200]};
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    text-transform: capitalize;
    h3, h4 {
        color: ${({ theme }) => theme.palette.common.black};
    }
    h3 {
        margin-bottom: 15px;
    }
`
const PricingInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 10px;
    font-size:  17px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.common.black};
    background-color: ${({ theme }) => theme.palette.grey[200]};
    &:nth-child(odd) {
        background-color: ${({ theme }) => theme.palette.common.white};
    }
`

const pricingMain = {
    title: 'pick up your plan',
    modules: [
        'نظام نقاط البيع السّحابي',
        'يمكنه العمل  اوف لاين ',
        'دعم فنّي على مدار السّاعة',
        'إدارة قائمة المنتجات',
        'وحدة الزّبائن',
        'لوحة المراقبة',
        'التّقارير',
        'إدارة الطّاولات',
        'إدارة المخزون',
        'الفعاليّات المؤقّتة',
        'الحد الأقصى من الموظفين',
        'ادارة الموظفين',
        'امكانيه التحكم ب الادوار للموظفين',
        'الحد الاقصى من الخدمات',
        'مناطق التّوصيل',
        'بطاقات الهدايا',
        'قائمة العروضات',
        'برامج الولاء',
        'تطبيق مقدم الخدمة',
        'مدير حساب متجاوب',
        'الويب كاشير',
        'خدمات التّوصيل',
        'المستودعات',
        'تطبيق عميل',
        'صفحة خاصه على الموقع',
        'ربط تقويم قوقل',
        'امكانيه اضافة الادوار للموظفين',
        'الكوبونات',
        'مميزات اخرى',
        '',
    ],
}

const AllPackages = props => {

    const [isMonthly, setIsMonthly] = useState(true);

    const { t } = useTranslation();
    const [packages, setPackages] = useState(null);

    useEffect(() => {
        axios.get('/packages')
            .then(res => {
                setPackages(res.data.data);
            })
            .catch(err => {
                //console.log(err);
            })
    }, [])

    const handleChange = (event) => {
        setIsMonthly(event.target.checked);
    };


    let content = (
        <Loader>
            <CircularProgress color="secondary" />
        </Loader>
    );
    if (packages) {
        let fetchedPackages = [...packages];
        content = (
            <Container maxWidth="lg">
                <PricingTable>
                    <PricingMain>
                        <PricingHeading> {t(pricingMain.title)} </PricingHeading>
                        <Wrapper>
                            {
                                pricingMain.modules.map((item, index) => <PricingCell key={index}>{t(item)}</PricingCell>)
                            }
                        </Wrapper>
                    </PricingMain>
                    {
                        fetchedPackages.map((item, index) => {
                            return (
                                <PricingColumn key={item.id} >
                                    <PricingName> {t(item.name)}</PricingName>
                                    <PricingPrice>
                                        <h3>{formatCurrency(isMonthly ? item.monthly_price : item.annual_price)}</h3>
                                        <h4>{isMonthly ? t('per month') : t('per year')}</h4>
                                    </PricingPrice>
                                    <Wrapper>
                                        <PricingInfo>{t(item)}</PricingInfo>
                                        <PricingInfo>
                                            <NavLink to={`/auth?page=join-us&package=${item.id}`}>
                                                <Button variant='outlined' color="secondary">{t('subscribe')}</Button>
                                            </NavLink>
                                        </PricingInfo>
                                    </Wrapper>
                                </PricingColumn>
                            )
                        })
                    }
                </PricingTable>
            </Container>
        );
    }

    return (
        <HomeLayout>
            <PackagesWrapper>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent='center' sx={{ marginBottom: '20px' }} >
                    <SwitcherLabel >{t('Yearly')}</SwitcherLabel>
                    <Switch value={isMonthly} onChange={handleChange} defaultChecked color='secondary' inputProps={{ 'aria-label': 'ant design' }} />
                    <SwitcherLabel>{t('Monthly')}</SwitcherLabel>
                </Stack>
                {content}
            </PackagesWrapper>
        </HomeLayout>
    )
}
export default AllPackages
