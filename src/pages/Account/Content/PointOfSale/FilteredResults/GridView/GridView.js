import styled from 'styled-components';
import Card from '@mui/material/Card';
import {CustomButton} from '../../../../../../components/UI/Button/Button'
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
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
        background-color: ${({ theme }) => theme.palette.background.default};
        position: relative;
        height: 250px;
        width: 100%;
    }
`
const ResultImg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 15px;
    }
    img {
        border-radius: 15px;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const ResultContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding:15px;
`
const ResultName = styled.h3`
    font-size: 18px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.white};
    margin-bottom: 10px;
`
const PriceHolder = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`
const ResultPrice = styled.h4`
    font-size: 15px;
    line-height:1.5;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.white};
    margin-right:15px;
`
const ResultDiscount = styled.h4`
    font-size: 15px;
    line-height:1.5;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.error.main};
    text-decoration: line-through;
`
const AddResult = styled(CustomButton)`
    &.MuiButton-root {
        font-size: 15px;
        width: max-content;
        padding: 0 15px;
        height: 40px;
    }
`

const GridView = ( props ) => {

    const { t } = useTranslation()

    const { data, type, loading, action } = props;

    const addItemHandler = ( id ) => {
        const addedItemIndex = data.findIndex( item  => item.id === id );
        const addedItem = data[addedItemIndex];
        type === 'deals' && (addedItem.name = addedItem.title);
        const addedItemData = {
            id: addedItem.id,
            name: addedItem.name,
            price: addedItem.discount_price,
            quantity: 1,
            type: type,
        }
        action(addedItemData);
    }

    let content = data.map( (item, index) => {
        type === 'deals' && (item.name = item.title);
        return (
            <Grid item xs={6} sm={4}md={6}  lg={3} key={item.id} >
                <ResultCard>
                    <ResultImg>
                        <img  src={item.image}  alt="Result" />
                    </ResultImg>
                    <ResultContent>
                        <ResultName>{item.name}</ResultName>
                        <PriceHolder>
                            <ResultPrice>{formatCurrency(item.discount_price)}</ResultPrice>
                            {item.price !== item.discount_price ? <ResultDiscount>{formatCurrency(item.price)}</ResultDiscount> : null}
                        </PriceHolder>
                        <AddResult onClick={ ( id ) =>addItemHandler(item.id) } >{t('add')}<AddIcon sx={{ml: 1}} /></AddResult>
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
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '300px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '300px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '300px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '300px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '300px', }} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Skeleton variant="rectangular" sx={{ width: '100%', borderRadius: '15px', height: '300px' , }} />
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

export default GridView;
