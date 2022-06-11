import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

const Notifications = props => {


    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}
export default Notifications;