import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    overflow: hidden;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.palette.text.disabled};
    `

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-left: 1px solid;
    border-right: 1px solid;
    border-color: ${props => props.theme.palette.divider};
    color: ${({ theme }) => theme.palette.text.primary};
    margin: 0px;
    width: 40px;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    padding: 11px 0;
    background: transparent;
    cursor: pointer;
    svg {
        color: ${({ theme }) => theme.palette.text.primary};
        width: 20px;
        height: 20px;
    }
`
const DisplayValue = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.palette.text.primary};
`


const Increment = props => {

    const { increment, decrement, value, id } = props

    return (
        <Wrapper>
            <ActionButton onClick={ ( ) =>  decrement( id) }><RemoveIcon/></ActionButton>
            <DisplayValue>{value}</DisplayValue>
            <ActionButton onClick={ ( ) =>  increment( id) }><AddIcon/></ActionButton>
        </Wrapper>
    )
}
export default Increment;