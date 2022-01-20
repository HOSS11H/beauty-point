import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #fafafa;
    h1 {
        font-size: 3rem;
        font-weight: 700;
        color: #000;
        text-transform: uppercase;
    }
`

const NotFound = props => {

    const {t} = useTranslation();

    return (
        <Wrapper>
            <h1>{t('404 page not found')}</h1>
        </Wrapper>
    )
}   
export default NotFound;