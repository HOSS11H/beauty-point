import { Fragment } from "react";
import { connect } from "react-redux";
import { searchServices } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";

import ServicesTable from './ServicesTable/ServicesTable';

function Services(props) {

    const { searchServicesHandler } = props;

    return (
        <Fragment>
            <SearchBar searchHandler={searchServicesHandler}/>
            <ServicesTable />
        </Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        searchServicesHandler: ( language, word ) => dispatch(searchServices( language, word )),
    }
}

export default connect(null, mapDispatchToProps)(Services);