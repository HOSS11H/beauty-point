import { Card, Grid } from "@mui/material";
import styled from 'styled-components';
import Lottie from "lottie-react";
import noDataAnimation from '../../../../../../../assets/animations/no-data.json'
import Loader from "../../../../../../../components/UI/Loader/Loader";
import { formatCurrency } from "../../../../../../../shared/utility";

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
        width: 100%;
        max-height: calc(100vh - 280px);
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

const Item = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    text-align: center;
    background-color: ${ ({ theme }) =>  theme.palette.secondary.main};
    color: ${ ({ theme }) => theme.palette.text.white};
    min-height: 120px;
    height: 100%;
    cursor: pointer;
    h6 {
        font-size: 16px;
        color: ${ ({ theme }) => theme.palette.common.white};
        margin-bottom: 10px;
    }
`

const Price = styled.p`
    color: ${ ({ theme }) => theme.palette.common.white};
    font-size: 15px;
    font-weight: 600;
    background-color: ${ ({ theme }) => theme.palette.common.black};
    border-radius: 10px;
    display: inline-block;
    width: max-content;
    padding: 5px;
    `
const OldPrice = styled.p`
    text-decoration: line-through;
    background-color: transparent;
    padding: 0;
    font-weight: 500;
    color: ${ ({ theme }) => theme.palette.common.white};
`

const Items = props => {
    const { data, loading, lastElementRef, type } = props;

    let content;

    if ( loading ) {
        content = (
            <Loader height="500px" />
        )
    }
    if ( data.length === 0 && !loading ) {
        content = (
            <Lottie animationData={noDataAnimation} loop />
        )
    }
    if ( data.length > 0 && !loading ) {
        content = (
            <Grid container spacing={1} >
                {data.map( (item , index) => {
                    return (
                        <Grid item xs={6} sm={4} lg={3} >
                            <Item key={index} >
                                <h6>{item.name || item.title}</h6>
                                <Price>{formatCurrency(item.discount_price)}</Price>
                                {item.price !== item.discount_price ? <OldPrice>{formatCurrency(item.price)}</OldPrice> : null}
                            </Item>
                        </Grid>
                    )
                } )  }
            </Grid>
        )
    }

    return (
        <Wrapper >
            {content}
        </Wrapper>
    )
}
export default Items;