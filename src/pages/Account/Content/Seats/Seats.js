import { Fragment } from "react";
import { Outlet } from 'react-router';

const Seats = props => {

    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}
export default Seats;