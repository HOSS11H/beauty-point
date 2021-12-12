import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 0;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    color: ${({ theme }) => theme.palette.common.white};
    flex-shrink: 0;
    margin-right: 10px;
    cursor: pointer;
    &:last-child {
        margin-right: 0;
    }
    svg {
        width: 18px;
        height: 18px;
    }
    ${({ edit }) => edit && css`
        background-color: ${({ theme }) => theme.palette.primary.main};
    `}
    ${({ view }) => view && css`
        background-color: ${({ theme }) => theme.palette.info.main};
    `}
    ${({ remove }) => remove && css`
        background-color: ${({ theme }) => theme.palette.error.main};
    `}
`



const Actions = (props) => {

    const { t } = useTranslation();

    const { edit, view, remove, editHandler, removeHandler, viewHandler } = props;


    return (
        <ActionsWrapper>
            { edit && (
                <Tooltip title={t('Edit')} onClick={editHandler}>
                    <ActionButton edit >
                        <CreateIcon />
                    </ActionButton>
                </Tooltip>
            )}
            { view && (
                <Tooltip title={t('View')} onClick={viewHandler} >
                    <ActionButton view >
                        <VisibilityIcon />
                    </ActionButton>
                </Tooltip>
            )}
            { remove && (
                <Tooltip title={t('Remove')} onClick={removeHandler} >
                    <ActionButton remove >
                        <DeleteIcon />
                    </ActionButton>
                </Tooltip>
            )}
        </ActionsWrapper>
    );
}
export default Actions