import { Fragment } from 'react'
import EarningReport from './EarningReport/EarningReport';
import SalesReport from './SalesReport/SalesReport';
import TabPanel from './TabPanel/TabPanel';
import TabularReport from './TabularReport/TabularReport';

const TabsContent = props => {

    const { current } = props

    return (
        <Fragment>
            <TabPanel value={current} index={0}>
                <TabularReport />
            </TabPanel>
            <TabPanel value={current} index={1}>
                <EarningReport />
            </TabPanel>
            <TabPanel value={current} index={2}>
                <SalesReport />
            </TabPanel>
        </Fragment>
    )
}
export default TabsContent;