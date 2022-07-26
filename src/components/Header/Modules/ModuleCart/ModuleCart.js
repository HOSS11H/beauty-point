import { Badge, IconButton } from '@mui/material';
import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from './Cart/Cart';
import { useState } from 'react';

export const Wrapper = styled.div`
    margin-right: 20px;
    @media screen and (max-width: 899.98px) {
        margin-right: 0;
    }
    &:last-child {
        margin-right: 0px;
    }
    svg {
        color:  ${({ theme }) => theme.palette.common.white};
    }
`

const ModuleCart = props => {

    const [ showCart, setShowCart ] = useState(false)

    const toggleCartHandler = ( ) => {
        setShowCart(prevState => !prevState)
    }

    const closeCartHandler = ( ) => {
        setShowCart(false)
    }

    return (
        <Wrapper>
            <IconButton onClick={toggleCartHandler} >
                <Badge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <Cart show={showCart} onClose={closeCartHandler} />
        </Wrapper>
    )
}
export default ModuleCart;