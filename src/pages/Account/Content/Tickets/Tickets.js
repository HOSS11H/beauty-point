import { Fragment } from "react";
import { Outlet } from 'react-router';

const Tickets = props => {

    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}
export default Tickets;