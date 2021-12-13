import { Fragment, useState } from 'react';
import styled from 'styled-components';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridView from './GridView/GridView';
import ListView from './ListView/ListView';
import IconButton from '@mui/material/IconButton';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ViewBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
`

const Content = styled.div`

`
const CustomMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 270px;
    flex-grow: 1;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.palette.divider};
    p {
        font-size: 24px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
    `




const FilteredResults = (props) => {

    const { results, fetchedServices, fetchedProducts, fetchedDeals, fetchingServices, fetchingProducts, fetchingDeals, addToCart } = props;

    const { t } = useTranslation()

    let fetchedData = { data: [], };

    if (results === 'services') {
        fetchedData = fetchedServices;
    } else if (results === 'products') {
        fetchedData = fetchedProducts;
    } else if (results === 'deals') {
        fetchedData = fetchedDeals;
    }

    const [isGridView, setIsGridView] = useState(true)

    let content;

    content = (
        <Fragment>
            {isGridView ? <GridView type={results} data={fetchedData.data} action={addToCart} loading={fetchingServices || fetchingProducts || fetchingDeals} /> : <ListView type={results} data={fetchedData.data} action={addToCart} loading={fetchingServices || fetchingProducts || fetchingDeals} />}
        </Fragment>
    )

    return (
        <Fragment>
            <ViewBar>
                <IconButton onClick={() => setIsGridView(true)} sx={{ mr: 1 }}>
                    <GridViewIcon />
                </IconButton>
                <IconButton onClick={() => setIsGridView(false)} >
                    <FormatListBulletedIcon />
                </IconButton>
            </ViewBar>
            <Content>
                {content}
                {(fetchedData.data.length === 0 && !fetchingServices && !fetchingProducts && !fetchingDeals) && (
                    <CustomMessage>
                        <p>{t('No Items')}</p>
                    </CustomMessage>
                )}
            </Content>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedServices: state.services.posServices.services,
        fetchingServices: state.services.posServices.fetchingServices,
        fetchedProducts: state.products.posProducts.products,
        fetchingProducts: state.products.posProducts.fetchingProducts,
        fetchedDeals: state.deals.posDeals.deals,
        fetchingDeals: state.deals.posDeals.fetchingDeals,
    }
}


export default connect(mapStateToProps, null)(FilteredResults);