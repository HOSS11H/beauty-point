import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import CreateIcon from '@mui/icons-material/Create';

const ActionsWrapper= styled.div`
    display: flex;
    align-items: center;
`
const ActionButton= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    color: ${({theme})=>theme.palette.common.white};
    flex-shrink: 0;
    margin-right: 10px;
    &:last-child {
        margin-right: 0;
    }
    svg {
        width: 20px;
        height: 20px;
    }
    ${ ( { edit } ) => edit && css`
        background-color: ${ ( { theme } ) => theme.palette.primary.main};
    `}
    ${ ( { view } ) => view && css`
        background-color: ${ ( { theme } ) => theme.palette.info.main};
    `}
`


const Actions = ( props ) => {

    const { t } = useTranslation();

    return (
        <ActionsWrapper>
            <Tooltip title={ t('text') }>
                <ActionButton>
                    <CreateIcon />
                </ActionButton>
            </Tooltip>
        </ActionsWrapper>
    );
}
export default Actions