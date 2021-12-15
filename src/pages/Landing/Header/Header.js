import NavBar from "./NavBar/NavBar";
import TopBar from "./TopBar/TopBar";
import styled from 'styled-components';
import MobileBar from "./MobileBar/MobileBar";

const HeaderWrapper = styled.header`
    background-color: transparent;
    position        : absolute;
    top             : 0;
    left            : 0;
    width           : 100%;
    z-index:5;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <TopBar/>
            <NavBar />
            <MobileBar />
        </HeaderWrapper>
    )
}
export default Header;