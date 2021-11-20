import { Fragment } from "react";
import { connect } from "react-redux";
import { searchDeals } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import DealsTable from './DealsTable/DealsTable';

function Deals(props) {

    const { searchDealsHandler } = props

    return (
        <Fragment>
            <SearchBar searchHandler={searchDealsHandler}/>
            <DealsTable />
        </Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        searchDealsHandler: ( language, word ) => dispatch(searchDeals( language, word )),
    }
}

export default connect(null, mapDispatchToProps)(Deals);