import { Container } from "@mui/material";
import styled from 'styled-components';
import ModuleLanguage from "../Modules/ModuleLanguage/ModuleLanguage";
import ModuleSocial from "../Modules/ModuleSocial/ModuleSocial";

const TobBarWrapper = styled.div`
    padding         : 28px 0px 0px;
	display         : flex;
	position        : relative;
	z-index         : 8888;
	background-color: transparent;
	.block-right {
		display : flex;
		align-items : center;
		justify-content: flex-end;
	}
`

const TopBar = props => {
    return (
        <TobBarWrapper>
            <Container maxWidth="lg">
                <div className="block-right">
                    <ModuleSocial />
                    <ModuleLanguage />
                </div>
            </Container>
        </TobBarWrapper>
    )
}
export default TopBar;