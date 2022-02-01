import styled from 'styled-components';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Wrapper = styled.div`
    max-width: 100%;
`
const Main = styled.main`
    text-align: left;
    overflow-x: hidden;
`

const Layout = props => {
    
    return (
        <Main dir={props.dir}>
            <Wrapper>
                <ToastContainer autoClose={3000} hideProgressBar />
                {props.children}
            </Wrapper>
        </Main>
    )
};


export default Layout;