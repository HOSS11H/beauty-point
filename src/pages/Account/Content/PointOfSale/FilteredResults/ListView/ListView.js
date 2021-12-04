import styled from 'styled-components';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';
import { formatCurrency } from '../../../../../../shared/utility';

const SkeletonsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 300px;
`

const ResultCard = styled(Card)`
    &.MuiPaper-root {
        border-radius: 15px;
        background: #8f1487b3;
        position: relative;
        cursor: pointer;
    }
`
const ResultContent = styled.div`
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding:15px 5px;
    text-align: center;
`
const ResultName = styled.h3`
    font-size: 13px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 700;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.palette.common.white};
`
const PriceHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ResultPrice = styled.h4`
    font-size: 13px;
    line-height:1.5;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.common.white};
`
const ResultDiscount = styled.h4`
    font-size: 13px;
    line-height:1.5;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.common.black};
    text-decoration: line-through;
`

const ListView = ( props ) => {

    const { data, type, loading, action } = props;

    const addItemHandler = ( id ) => {
        console.log(id, data);
        const addedItemIndex = data.findIndex( item  => item.id === id );
        const addedItem = data[addedItemIndex];
        type === 'products' && (addedItem.price_after_discount = addedItem.discount_price);
        type === 'deals' && (addedItem.price_after_discount = addedItem.price);
        type === 'deals' && (addedItem.name = addedItem.title);
        const addedItemData = {
            id: addedItem.id,
            price: addedItem.price_after_discount,
            quantity: 1,
            type: type,
        }
        action(addedItemData);
    }

    let content = data.map( (item, index) => {
        type === 'products' && (item.price_after_discount = item.discount_price);
        type === 'deals' && (item.price_after_discount = item.price);
        type === 'deals' && (item.name = item.title);
        return (
            <Grid item xs={6} sm={3} md={4} lg={3} key={item.id}>
                <ResultCard onClick={ ( id ) => addItemHandler( item.id) } >
                    <ResultContent>
                        <ResultName>{item.name}</ResultName>
                        <PriceHolder>
                            <ResultPrice>{formatCurrency(item.price_after_discount)}</ResultPrice>
                            {item.price !== item.price_after_discount ? <ResultDiscount>{formatCurrency(item.price)}</ResultDiscount> : null}
                        </PriceHolder>
                    </ResultContent>
                </ResultCard>
            </Grid>
        )
    } )

    if ( loading ) {
        content = (
            <SkeletonsWrapper>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '180px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '180px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '180px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '180px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '180px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '180px' , }} />
                    </Grid>
                </Grid>
            </SkeletonsWrapper>
        )
    }

    return (
        <Grid container spacing={1}>
            {content}
        </Grid>
    )
}

export default ListView;