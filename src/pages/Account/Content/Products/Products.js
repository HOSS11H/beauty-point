import { Fragment } from "react";
import { connect } from "react-redux";
import { searchProducts } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import ProductsTable from './ProductsTable/ProductsTable';

function Products(props) {

    const { searchProductsHandler } = props;


    return (
        <Fragment>
            <SearchBar searchHandler={searchProductsHandler}/>
            <ProductsTable />
        </Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        searchProductsHandler: ( language, word ) => dispatch(searchProducts( language, word )),
    }
}

export default connect(null, mapDispatchToProps)(Products);