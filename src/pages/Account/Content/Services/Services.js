import { Fragment } from "react";
import SearchBar from "./SearchBar/SearchBar";

import ServicesTable from './ServicesTable/ServicesTable';

export default function Services() {


    return (
        <Fragment>
            <SearchBar />
            <ServicesTable />
        </Fragment>
    );
}