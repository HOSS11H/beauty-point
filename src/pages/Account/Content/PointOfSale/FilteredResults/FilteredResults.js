import { Fragment, useState } from 'react';
import styled from 'styled-components';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridView from './GridView/GridView';
import ListView from './ListView/ListView';
import IconButton from '@mui/material/IconButton';
import { connect } from 'react-redux';

const ViewBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
`

const Content = styled.div`

`




const FilteredResults = ( props ) => {

    const { results, fetchedServices, fetchedProducts, fetchedDeals, fetchingServices, fetchingProducts, fetchingDeals } = props;


    let fetchedData = { data: [ ], } ;

    if ( results === 'services' ) {
        fetchedData = fetchedServices;
    } else if ( results === 'products' ) {
        fetchedData = fetchedProducts;
    } else if ( results === 'deals' ) {
        fetchedData = fetchedDeals;
    }

    const [ isGridView, setIsGridView ] = useState(true)

    let content;

    content = (
        <Fragment>
            {isGridView ? <GridView type={results} data={fetchedData.data} loading={fetchingServices || fetchingProducts || fetchingDeals} /> : <ListView type={results} data={fetchedData.data} loading={fetchingServices || fetchingProducts || fetchingDeals}/>}
        </Fragment>
    )

    return (
        <Fragment>
            <ViewBar>
                <IconButton onClick={() => setIsGridView(true)} sx={{ mr:1 }}>
                    <GridViewIcon  />
                </IconButton>
                <IconButton onClick={() => setIsGridView(false)} >
                    <FormatListBulletedIcon />
                </IconButton>
            </ViewBar>
            <Content>
                {content}
            </Content>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedServices: state.services.services,
        fetchingServices: state.services.fetchingServices,
        fetchedProducts: state.products.products,
        fetchingProducts: state.products.fetchingProducts,
        fetchedDeals: state.deals.deals,
        fetchingDeals: state.deals.fetchingDeals,
    }
}


export default connect(mapStateToProps, null)(FilteredResults);