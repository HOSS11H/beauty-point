import { Fragment } from 'react'
import EarningReport from './EarningReport/EarningReport';
import SalesReport from './SalesReport/SalesReport';
import TabPanel from './TabPanel/TabPanel';
import TabularReport from './TabularReport/TabularReport';
import EmployeeReport from './EmployeeReport/EmployeeReport';
import TaxesReport from './TaxesReport/TaxesReport';
import BookingsReport from './BookingsReport/BookingsReport';
import CommissionsReport from './CommissionsReport/CommissionsReport';

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
            <TabPanel value={current} index={4}>
                <TaxesReport />
            </TabPanel>
            <TabPanel value={current} index={5}>
                <BookingsReport />
            </TabPanel>
            <TabPanel value={current} index={6}>
                <CommissionsReport />
            </TabPanel>
        </Fragment>
    )
}
export default TabsContent;