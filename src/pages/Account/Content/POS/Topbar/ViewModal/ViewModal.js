import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { POSModal } from "../../../../../../components/UI/POSModal/POSModal";

const ViewModal = props => {
    const { open, handleClose, view, changeView } = props;
    const { t } = useTranslation()

    return (
        <POSModal open={open} handleClose={handleClose} heading='Select Sales or Returns Type' >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => changeView('sales')} selected={view === 'sales'} >
                        <ListItemText primary={t('sales')} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => changeView('returns')} selected={view === 'returns'} >
                        <ListItemText primary={t('returns')} />
                    </ListItemButton>
                </ListItem>
            </List>
        </POSModal>
    )
}
export default ViewModal;