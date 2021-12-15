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
        background-color: #96248e;
        color           : #FFF;
        border-radius   : 50px;
        text-align      : center;
        font-size       : 30px;
        box-shadow      : 2px 2px 3px rgba(0, 0, 0, 0.2);
        z-index         : 100;
    }
`

const ModuleWhatsapp = props => {
    return (
        <ModuleWhatsappWrapper>
            <a href="/" >
                <WhatsAppIcon />
            </a>
        </ModuleWhatsappWrapper>
    )
}

export default ModuleWhatsapp;