import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 100%;
`
const Main = styled.main`
    text-align: left;
`

const Layout = props => {
    
    

    return (
        <Main dir={props.dir}>
            <Wrapper>
                {props.children}
            </Wrapper>
        </Main>
    )
};


export default Layout;