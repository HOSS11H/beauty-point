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
    width: 25px;
    height: 30px;
    text-align: center;
    vertical-align: middle;
    padding: 11px 0;
    background: transparent;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
    }
    svg {
        color: ${({ theme }) => theme.palette.text.primary};
        width: 16px;
        height: 16px;
    }
`
const DisplayValue = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 30px;
    color: ${({ theme }) => theme.palette.text.primary};
`


const Increment = props => {

    const { increment, value, id, type } = props

    return (
        <Wrapper>
            <ActionButton disabled onClick={ ( ) => {} }><RemoveIcon/></ActionButton>
            <DisplayValue>{value}</DisplayValue>
            <ActionButton onClick={ ( ) =>  increment(type, id) }><AddIcon/></ActionButton>
        </Wrapper>
    )
}
export default Increment;