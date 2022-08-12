import { useCallback, useState } from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import Cart from './Cart/Cart'
import Sales from './Sales/Sales'
import Topbar from './Topbar/Topbar'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 468px;
    grid-gap: 20px;
    min-height: 100vh;
`

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