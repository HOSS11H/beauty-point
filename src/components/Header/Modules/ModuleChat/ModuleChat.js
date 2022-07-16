import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';


const ModuleChatWrapper = styled.div`
    a {
        position        : fixed;
        width           : 60px;
        height          : 60px;
        display         : flex;
        align-items     : center;
        justify-content : center;
        bottom          : 40px;
        right           : 40px;
        background-color: ${ ( { theme } ) => theme.vars.secondary};
        color           : #FFF;
        border-radius   : 50%;
        text-align      : center;
        font-size       : 30px;
        box-shadow      : 2px 2px 3px rgba(0, 0, 0, 0.2);
        z-index         : 100;
        @media screen and (max-width: 899.98px) {
            width           : 50px;
            height          : 50px;
            bottom : 70px;
            right  : 15px;
        }
    }
`

const ModuleChat = props => {
    return (
        <ModuleChatWrapper>
            <a href="https://tawk.to/chat/629cf1b2b0d10b6f3e75cc7f/1g6dn5e19" >
                <SendIcon />
            </a>
        </ModuleChatWrapper>
    )
}

export default ModuleChat;