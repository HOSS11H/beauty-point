import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styled from 'styled-components';

const ModuleSocialWrapper = styled.div`
    a {
        margin-right : 13px;
        &:last-child {
            margin-right : 0px;
        }
        svg{
            font-size :16px;
            color        :#fff;
            transition   : 300ms ease-in-out;
            &:hover {
                transform: translateY(-5px);
                color    : #96248e;
            }
        }
    }
`

const ModuleSocial = props => {
    return (
        <ModuleSocialWrapper>
            <a className="share-facebook" href="page-vendor.html">
                <FacebookIcon />
            </a>
            <a className="share-twitter" href="page-vendor.html">
                <TwitterIcon />
            </a>
            <a className="share-instagram" href="page-vendor.html">
                <InstagramIcon />
            </a>
            <a className="share-youtube" href="page-vendor.html">
                <YouTubeIcon />
            </a>
            <a className="share-whatsapp" href="page-vendor.html">
                <WhatsAppIcon />
            </a>
        </ModuleSocialWrapper>
    )
}
export default ModuleSocial;