import { Fragment } from 'react'
import EarningReport from './EarningReport/EarningReport';
import SalesReport from './SalesReport/SalesReport';
import TabPanel from './TabPanel/TabPanel';
import TabularReport from './TabularReport/TabularReport';
import EmployeeReport from './EmployeeReport/EmployeeReport';

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
            <TabPanel value={current} index={3}>
                <EmployeeReport />
            </TabPanel>
        </Fragment>
    )
}
export default TabsContent;