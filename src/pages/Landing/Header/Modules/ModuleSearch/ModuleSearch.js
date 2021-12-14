import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

const ModuleSearchWrapper = styled.div`
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
        background: #fff;
        border-radius: 50%;
        transition: 0.3s ease-in-out;
        @media screen and (max-width: 500px) {
            width: 40px;
            height: 40px;
        }
        &:hover {
            background-color:  ${ ({ theme }) => theme.vars.primary };
            svg {
                color: #fff;
            }
        }
        svg {
            transition: 0.3s ease-in-out;
            font-size: 18px;
            color: ${ ({ theme }) => theme.vars.primary };
        }
    }
`

const ModuleSearch = props => {
    return (
        <ModuleSearchWrapper>
            <div className="module-icon">
                <SearchIcon />
            </div>
        </ModuleSearchWrapper>
    )
}

export default ModuleSearch;