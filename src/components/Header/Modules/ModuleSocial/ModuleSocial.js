import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const ModuleSocialWrapper = styled.div`
    a {
        margin-right : 13px;
        &:last-child {
            margin-right : 0px;
        }
        svg{
            font-size :16px;
            color        :${ ( { theme } ) => theme.palette.common.white};
            transition   : 300ms ease-in-out;
            &:hover {
                transform: translateY(-5px);
                color    : ${ ( { theme } ) => theme.vars.secondary};
            }
        }
    }
`

const ModuleSocial = props => {
    return (
        <ModuleSocialWrapper>
            <NavLink className="share-facebook" to="/">
                <FacebookIcon />
            </NavLink>
            <NavLink className="share-twitter" to="/">
                <TwitterIcon />
            </NavLink>
            <NavLink className="share-instagram" to="/">
                <InstagramIcon />
            </NavLink>
            <NavLink className="share-youtube" to="/">
                <YouTubeIcon />
            </NavLink>
            <NavLink className="share-whatsapp" to="/">
                <WhatsAppIcon />
            </NavLink>
        </ModuleSocialWrapper>
    )
}
export default ModuleSocial;