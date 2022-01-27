import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styled from 'styled-components';


const ModuleWhatsappWrapper = styled.div`
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

const ModuleWhatsapp = props => {
    return (
        <ModuleWhatsappWrapper>
            <a href="https://api.whatsapp.com/send?phone=+966581001969&text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85" >
                <WhatsAppIcon />
            </a>
        </ModuleWhatsappWrapper>
    )
}

export default ModuleWhatsapp;