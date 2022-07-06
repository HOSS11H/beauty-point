import styled from 'styled-components';

import { StyledToastifyContainer } from '../UI/StyledToastContainer/StyledToastContainer.styled';

import "react-toastify/dist/ReactToastify.css";
import Notification from '../Notification/Notification';

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
                <StyledToastifyContainer
                    position="bottom-right"
                    autoClose={4000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnHover={false}
                    progress={undefined}
                    draggable={false}
                />
                <Notification />
                {props.children}
            </Wrapper>
        </Main>
    )
};


export default Layout;