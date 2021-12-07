import { Fragment } from 'react'
import TabPanel from './TabPanel/TabPanel';
import TabularReport from './ProductsTable/TabularReport';

const TabsBody = props => {

    const { current } = props

    return (
        <Fragment>
            <TabPanel value={current} index={0}>
                <TabularReport />
            </TabPanel>
        </Fragment>
    )
}
export default TabsBody;