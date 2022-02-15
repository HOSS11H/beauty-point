import { useContext } from 'react';
import ThemeContext from '../../../../store/theme-context';
import styled from 'styled-components';
import { ButtonSmall } from '../../../UI/Button/Button';

const ModuleWrapper = styled.div`
    font-size: 14px;
    text-transform: uppercase;
    margin-left: 20px;
    @media screen and (max-width: 500px) {
        margin-left: 5px;
    }
`
const SwitchBtn = styled(ButtonSmall)`
    &.MuiButton-root {
        margin-bottom: 0;
        width: auto;
        padding: 0 15px;
        color:  ${ ( { theme } ) => theme.vars.secondary};
        background-color: ${ ( { theme } ) => theme.palette.common.white};
        font-family: ${ ( { theme } ) => theme.direction === "ltr" ? "'Cairo', sans-serif " : "'Poppins', sans-serif " };
        &:hover {
            color:  ${ ( { theme } ) => theme.vars.secondary};
            background-color: ${ ( { theme } ) => theme.palette.common.white};
        }
    }
`

const ModuleLanguage = () => {

    const themeCtx = useContext(ThemeContext)

    const {lang, toggleLanguage} = themeCtx;    

    return (
        <ModuleWrapper>
            <SwitchBtn onClick={toggleLanguage} >
                {lang === "ar" ? "switch to EN" : "الانتقال الي العربية"}
            </SwitchBtn>
        </ModuleWrapper>
    )
}
export default ModuleLanguage;