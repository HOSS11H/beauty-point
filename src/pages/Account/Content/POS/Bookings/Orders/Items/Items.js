import { Card, List, ListItemButton } from "@mui/material";
import Lottie from "lottie-react";
import moment from "moment";
import styled from 'styled-components';
import noDataAnimation from '../../../../../../../assets/animations/no-data.json';
import Loader from "../../../../../../../components/UI/Loader/Loader";
import EventNoteIcon from '@mui/icons-material/EventNote';

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
        width: 100%;
        max-height: calc(100vh - 299px);
        padding-right: 16px;
        overflow-y: auto;
        min-height: 0;
        // Scroll //
        -webkit-overflow-scrolling: touch;
        &::-webkit-scrollbar {
            height: 7px;
            width: 8px;
            background-color: ${({ theme }) => theme.palette.divider};
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
            margin-left: 2px;
            background: ${({ theme }) => theme.vars.primary};
            border-radius: 10px;
            cursor: pointer;
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
    margin-left: 15px;
    font-size: 15px;
    & .MuiSvgIcon-root {
        margin-right: 5px;
        font-size: 20px;
    }
`

const Items = props => {
    const { data, loading, lastElementRef, assignCart, addBookingData } = props;

    const clickHandler = (id) => {
        const addedItemIndex = data.findIndex(item => item.id === id);
        const addedItem = data[addedItemIndex];
        let cartItems = {
            services: [],
            deals: [],
            products: [],
        }
        addedItem.items.forEach(item => {
            const updatedItem = { ...item }
            switch (updatedItem.type) {
                case 'service':
                    updatedItem.type = `${updatedItem.type}s`
                    updatedItem.employee_id = updatedItem.employee?.id || 'none'
                    const updatedServices = [...cartItems.services]
                    updatedServices.push(updatedItem)
                    cartItems = {
                        ...cartItems,
                        services: updatedServices
                    }
                    break;
                case 'product':
                    updatedItem.type = `${updatedItem.type}s`
                    updatedItem.employee_id = updatedItem.employee?.id || 'none'
                    const updatedProducts = [...cartItems.products]
                    updatedProducts.push(updatedItem)
                    cartItems = {
                        ...cartItems,
                        products: updatedProducts
                    }
                    break;
                case 'deal':
                    updatedItem.type = `${updatedItem.type}s`
                    updatedItem.employee_id = updatedItem.employee?.id || 'none'
                    const updatedDeals = [...cartItems.deals]
                    updatedDeals.push(updatedItem)
                    cartItems = {
                        ...cartItems,
                        deals: updatedDeals
                    }
                    break;
                default:
            }
        })
        assignCart(cartItems)
        addBookingData(addedItem)
    }

    let content;

    if (data.length === 0 && loading) {
        content = (
            <Loader height="500px" />
        )
    }
    if (data.length === 0 && !loading) {
        content = (
            <Lottie animationData={noDataAnimation} loop />
        )
    }
    if (data.length > 0) {
        content = (
            <List>
                {data.map((item, index) => {
                    if (data.length - 1 === index) {
                        return (
                            <ListItemButton key={item.id} ref={lastElementRef} onClick={clickHandler.bind(null, item.id)} >
                                <span>
                                    {`POS ${item.id}`}
                                </span>
                                <Chip>
                                    <EventNoteIcon />
                                    {moment(item.dateTime).format('YYYY-MM-DD hh:mm: a')}
                                </Chip>
                            </ListItemButton>
                        )
                    }
                    return (
                        <ListItemButton key={item.id} onClick={clickHandler.bind(null, item.id)} >
                            <span>
                                {`POS ${item.id}`}
                            </span>
                            <Chip>
                                <EventNoteIcon />
                                {moment(item.dateTime).format('YYYY-MM-DD hh:mm: a')}
                            </Chip>
                        </ListItemButton>
                    )
                })}
            </List>
        )
    }

    return (
        <Wrapper >
            {content}
        </Wrapper>
    )
}
export default Items;