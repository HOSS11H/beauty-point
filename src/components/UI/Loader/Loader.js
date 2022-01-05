import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${ props => props.height || '300px' };
`
const Loader = props => {

    const { height } = props;

    return (
        <Wrapper height={ height }>
            <CircularProgress color="secondary" />
        </Wrapper>
    )
}

export default Loader;