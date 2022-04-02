import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';


const ModuleNavWrapper = styled.div`
    a {
        position        : fixed;
        width           : 60px;
        height          : 60px;
        display         : flex;
        align-items     : center;
        justify-content : center;
        bottom          : 40px;
        right           : 40px;
        background-color: ${({ theme }) => theme.vars.secondary};
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

const ModuleNav = props => {
    const params = useParams();
    let content ;

    if (params['*'] !== 'point-of-sale'  ) {
        content = (
            <ModuleNavWrapper>
                <NavLink to='point-of-sale' >
                    <AddShoppingCartIcon />
                </NavLink>
            </ModuleNavWrapper>
        )
    }
    return (
        <>
            {content}
        </>
    );

}

export default ModuleNav;