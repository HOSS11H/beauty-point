import { useCallback, useState } from 'react'
import { Fragment } from 'react'
import Bookings from './Bookings/Bookings'
import Returns from './Returns/Returns'
import Sales from './Sales/Sales'
import Topbar from './Topbar/Topbar'

const POS = props => {

    const [view, setView] = useState('sales')

    const viewChangeHandler = useCallback((val) => {
        setView(val);
    }, [])


    let content;
    switch (view) {
        case 'sales':
            content = <Sales />
            break;
        case 'returns':
            content = <Returns />
            break;
        case 'bookings':
            content = <Bookings />
            break;
        default:
    }

    return (
        <Fragment>
            <Topbar view={view} changeView={viewChangeHandler} />
            {content}
        </Fragment>
    )
}
export default POS;