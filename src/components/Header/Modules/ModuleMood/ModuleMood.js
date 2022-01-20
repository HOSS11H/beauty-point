import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { useContext } from 'react';
import { IconButton } from '@mui/material';
import ThemeContext from '../../../../store/theme-context';
import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-right: 20px;
    @media screen and (max-width: 899.98px) {
        margin-right: 0;
    }
    &:last-child {
        margin-right: 0px;
    }
    svg {
        color:  ${({ theme }) => theme.palette.common.white};
    }
`

const ModuleMood = () => {
    const themeCtx = useContext(ThemeContext)
    return (
        <Wrapper>
            <IconButton onClick={themeCtx.toggleMode} >
                {themeCtx.theme.palette.mode === 'dark' ? <WbSunnyIcon /> : <Brightness2Icon />}
            </IconButton>
        </Wrapper>
    )
}
export default ModuleMood;