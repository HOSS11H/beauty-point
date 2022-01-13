import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { formatCurrency } from '../../../../shared/utility';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 25px 15px 53px;
    height: 100%;
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
    @media screen and (max-width: 899.98px) {
        max-height: 40vh;
        padding-bottom: 25px;
    }
`
const OverviewBody = styled.div`
    flex-grow: 1;
    max-height: 100%;
    overflow-y: auto;
    // Scroll //
    -webkit-overflow-scrolling: touch;
    padding-right: 5px;
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

const OverviewHeading = styled.h2`
    font-size: 14px;
    line-height: 1.5;
    color: ${({ theme }) => theme.palette.text.primary};
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 20px;
    text-align: left;
    `

const OverviewBlock = styled.div`
    text-align: left;
    h4 {
        font-size: 12px;
        line-height: 1.5;
        color: ${({ theme }) => theme.palette.text.primary};
        font-weight: 500;
        margin-bottom: 10px;
    }
`
const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    font-size: 13px;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 500;
`

const PriceCalculation = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    width: 100%;
    p {
        font-size: 13px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-right: 5px;
        &:last-child {
            margin-right: 0;
        }
    }
`

const CartOverview = props => {

    const { cartData, taxes, total } = props;

    const { t } = useTranslation()

    return (
        <Wrapper>
            <OverviewHeading>{t('summary')}</OverviewHeading>
            <OverviewBody>
                {
                    cartData.services.length > 0 && (
                        <OverviewBlock>
                            <h4>{t('services')}</h4>
                            {cartData.services.map(service => (
                                <Item key={service.id}>
                                    <span>{service.name}</span>
                                    <span>{formatCurrency(service.price)}</span>
                                </Item>
                            ))}
                        </OverviewBlock>
                    )
                }
                {
                    cartData.deals.length > 0 && (
                        <OverviewBlock>
                            <h4>{t('deals')}</h4>
                            {cartData.deals.map(deal => (
                                <Item key={deal.id}>
                                    <span>{deal.name}</span>
                                    <span>{formatCurrency(deal.price)}</span>
                                </Item>
                            ))}
                        </OverviewBlock>
                    )
                }
            </OverviewBody>
            <div>
                <PriceCalculation>
                    <p>{t('total taxes')}</p>
                    <p>{formatCurrency(taxes)}</p>
                </PriceCalculation>
                <PriceCalculation>
                    <p>{t('price after discount')}</p>
                    <p>{formatCurrency(total)}</p>
                </PriceCalculation>
            </div>
        </Wrapper>
    )
}
export default CartOverview;