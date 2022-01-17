import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from 'styled-components';


export const ModuleCartWrapper = styled.div`
    display: inline-flex;
    margin-right: 20px;
    &:last-child {
        margin-right: 0px;
    }
    .module-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background: ${({ theme }) => theme.palette.common.white};
        border-radius: 50%;
        transition: 0.3s ease-in-out;
        @media screen and (max-width: 500px) {
            width: 40px;
            height: 40px;
        }
        &:hover {
            background-color:  ${({ theme }) => theme.vars.secondary};
            svg {
                color: ${({ theme }) => theme.palette.common.white};
            }
        }
        svg {
            transition: 0.3s ease-in-out;
            font-size: 20px;
            color: ${({ theme }) => theme.vars.secondary};
            @media screen and (max-width: 500px) {
                font-size: 17px;
            }
        }
    }
`

const ModuleCart = props => {
    return (
        <ModuleCartWrapper>
            <div className="module-icon">
                <ShoppingCartIcon />
            </div>
        </ModuleCartWrapper>
    )
}

export default ModuleCart;