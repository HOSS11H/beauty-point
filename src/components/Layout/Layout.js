import styled from 'styled-components';

const Wrapper = styled.div`
`
const Main = styled.main`
    overflow-x: hidden;
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