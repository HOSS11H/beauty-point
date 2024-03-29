import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { formatCurrency } from '../../../../shared/utility';
import AuthContext from '../../../../store/auth-context';
import { ActionButton } from '../Actions/Actions';

const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        display:block;
        max-width: 100%;
        margin: auto;
        overflow: hidden;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius:20px;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.background.default};
        position: relative;
        cursor: pointer;
    }
`
const CommentName = styled.h4`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    transition: 0.3s ease-in-out;
    margin-bottom: 15px;
    cursor: pointer;
`
const CommentOwner = styled.h4`
    display: block;
    font-size: 16px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.vars.secondary};
    cursor: pointer;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`

const CommentCard = props => {

    const { t } = useTranslation()
    const authCtx = useContext(AuthContext);
    const { userId } = authCtx
    const { comment, deleteHandler } = props;

    return (
        <Fragment>
            <CustomCardMui >
                <CommentName>{comment.comment}</CommentName>
                <CommentOwner>{comment.owner.name}</CommentOwner>
                {+userId === +comment.owner.id && (
                    <ButtonWrapper>
                        <Button variant='text' color='secondary' onClick={deleteHandler.bind(null, comment.id)} >
                            {t('delete')}
                        </Button>
                    </ButtonWrapper>
                )}
            </CustomCardMui>
        </Fragment>
    )
}
export default CommentCard;