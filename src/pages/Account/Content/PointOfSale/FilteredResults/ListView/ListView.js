import styled from 'styled-components';
import Card from '@mui/material/Card';
import {CustomButton} from '../../../../../../components/UI/Button/Button'
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';

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
        background: ${({ theme }) => theme.palette.action.focus};
        position: relative;
    }
`
const ResultContent = styled.div`
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding:25px;
`
const ResultName = styled.h3`
    font-size: 20px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.palette.text.default};
`
const PriceHolder = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`
const ResultPrice = styled.h4`
    font-size: 16px;
    line-height:1.5;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.default};
    margin-right:15px;
`
const ResultDiscount = styled.h4`
    font-size: 16px;
    line-height:1.5;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.error.main};
    text-decoration: line-through;
`
const AddResult = styled(CustomButton)`
    &.MuiButton-root {
        font-size: 16px;
        width: max-content;
        padding: 0 25px;
        height: 50px;
    }
`

const ListView = ( props ) => {

    const { t } = useTranslation()

    const { data, loading, action } = props;

    const addItemHandler = ( id ) => {
        console.log(id, data);
        const addedItemIndex = data.findIndex( item  => item.id === id );
        const addedItem = data[addedItemIndex];
        const addedItemData = {
            id: addedItem.id,
            name: addedItem.name,
            price: addedItem.discounted_price,
            quantity: 1,
        }
        action(addedItemData);
    }

    let content = data.map( (item, index) => {
        return (
            <Grid item xs={12} sm={6} key={item.id}>
                <ResultCard>
                    <ResultContent>
                        <ResultName>{item.name}</ResultName>
                        <PriceHolder>
                            <ResultPrice>{item.formated_price}</ResultPrice>
                            {item.converted_price !== item.converted_discounted_price ? <ResultDiscount>{item.formated_discounted_price}</ResultDiscount> : null}
                        </PriceHolder>
                        <AddResult onClick={ ( id ) => addItemHandler( item.id) } >{t('add')}<AddIcon sx={{ml: 1}} /></AddResult>
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