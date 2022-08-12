import styled from 'styled-components'
import Cart from '../Cart/Cart';
import Results from './Results/Results';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 468px;
    grid-gap: 20px;
`


const Sales = props => {
    return (
        <Wrapper>
            <Results />
            <Cart />
        </Wrapper>
    )
}
export default Sales;