import { Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Fragment, useState } from 'react';
import ViewModal from './ViewModal/ViewModal'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
`

const CustomChip = styled(Chip)`

`

const Topbar = props => {
    const {view, changeView } = props;

    const { t } = useTranslation()

    const [ viewModalOpened, setViewModalOpened ] = useState(false)

    const openViewModalHandler = ( ) => {
        setViewModalOpened(true)
    }
    const closeViewModalHandler = ( ) => {
        setViewModalOpened(false)
    }


    return (
        <Fragment>
            <Wrapper>
                <CustomChip label={t(view)} icon={<KeyboardArrowDownIcon />} onClick={openViewModalHandler} />
            </Wrapper>
            <ViewModal view={view} open={viewModalOpened} handleClose={closeViewModalHandler} changeView={changeView}  />
        </Fragment>
    )
}
export default Topbar;