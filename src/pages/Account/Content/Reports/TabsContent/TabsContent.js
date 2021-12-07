import { Fragment } from 'react'
import TabPanel from './TabPanel/TabPanel';
import TabularReport from './TabularReport/TabularReport';

const TabsContent = props => {

    const { current } = props

    return (
        <Fragment>
            <TabPanel value={current} index={0}>
                <TabularReport />
            </TabPanel>
        </Fragment>
    )
}
export default TabsContent;