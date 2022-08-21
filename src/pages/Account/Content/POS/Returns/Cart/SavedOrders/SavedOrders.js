import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import { Badge, Button, IconButton, List, ListItemButton } from "@mui/material";
import moment from "moment";
import { Fragment, useState } from "react";
import styled from 'styled-components';
import { POSModal } from "../../../../../../../components/UI/POSModal/POSModal";

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    cursor: pointer;
    span {
        &:first-child {
            margin-right: 15px;
        }
    }
`

const Chip = styled.span`
    background: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.common.white};
    text-transform: capitalize;
    padding: 5px 10px;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
`

const SavedOrders = props => {

    const { storedItems, deleteOrder, restoreOrder } = props;

    const [showItemsModal, setShowItemsModal] = useState(false)

    const openItemsModalHandler = () => {
        setShowItemsModal(true)
    }
    const closeItemsModalHandler = () => {
        setShowItemsModal(false)
    }

    const itemClickHandler = (item, index) => {
        restoreOrder(item, index)
        closeItemsModalHandler()
    }

    return (
        <Fragment>
            <Button onClick={openItemsModalHandler} >
                <Badge badgeContent={storedItems.length} color="error">
                    <RestoreIcon />
                </Badge>
            </Button>
            <POSModal open={showItemsModal} handleClose={closeItemsModalHandler} heading='Orders Stored' >
                <List>
                    {storedItems.map((item, index) => {
                        return (
                            <ListItemButton key={index} >
                                <ItemContent onClick={() => itemClickHandler(item, index)} >
                                    <span>
                                        {`POS ${item.id.split('-')[0]}`}
                                    </span>
                                    <Chip>
                                        {moment(item.dateTime).format('YYYY-MM-DD hh:mm: a')}
                                    </Chip>
                                </ItemContent>
                                <IconButton color='error' onClick={deleteOrder.bind(null, index)} >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemButton >
                        )
                    })}
                </List>
            </POSModal>
        </Fragment>
    )
}

export default SavedOrders;