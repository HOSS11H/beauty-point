import { Fragment } from "react";
import { connect } from "react-redux";
import { searchServices } from '../../../../store/actions/index';
import SearchBar from "../../../../components/Search/SearchBar/SearchBar";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import ServicesTable from './ServicesTable/ServicesTable';
import { CustomButton } from '../../../../components/UI/Button/Button';

const ActionsWrapper = styled.div`
    display: flex;
`
const CreateBtn = styled(CustomButton)`
    &.MuiButton-root {
        margin-left: 20px;
        width: auto;
        padding: 0 20px;
        height: 64px;
        flex-shrink: 0;
        @media screen and (max-width: 600px) {
            height: 50px;
        }
    }
`

function Services(props) {

    const { t } = useTranslation()

    const { searchServicesHandler } = props;

    return (
        <Fragment>
            <ActionsWrapper>
                <SearchBar searchHandler={searchServicesHandler}/>
                <CreateBtn>{t('Create Service')}</CreateBtn>
            </ActionsWrapper>
            <ServicesTable />
        </Fragment>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        searchServicesHandler: (language, word) => dispatch(searchServices(language, word)),
    }
}

export default connect(null, mapDispatchToProps)(Services);