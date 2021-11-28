import Card from '@mui/material/Card';
import styled from'styled-components';
import { useTranslation } from 'react-i18next';
import Skeleton from '@mui/material/Skeleton';

export const CustomCardMui = styled(Card)`
    &.MuiPaper-root {
        max-width: 936px;
        margin: auto;
        overflow: hidden;
        box-shadow: rgb(90 114 123 / 11%) 0px 7px 30px 0px;
        border-radius:20px;
        margin-bottom: 40px;
        background-color: ${({ theme }) => theme.palette.background.default};
        &:last-child{
            margin-bottom:0;
        }
    }
`
export const CardHeading = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: ${ ( { theme } ) => `1px solid ${ theme.palette.divider }` };
    h4 {
        font-size: 22px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
    }
`
export const CardBody = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`
export const CardContent = styled.div`
    flex-grow: 1;
    width: 100%;
`
export const SkeletonsWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export default function CustomCard( props ) {

    const { t } = useTranslation();

    return (
        <CustomCardMui >
            <CardHeading>
                <h4>{t(props.heading)}{props.total}</h4>
            </CardHeading>
            <CardBody>
                {props.loading && (
                    <SkeletonsWrapper>
                        <Skeleton sx={{ width: '100%' }} />
                        <Skeleton sx={{ width: '100%' }} />
                        <Skeleton sx={{ width: '100%' }} />
                    </SkeletonsWrapper>
                )}
                {!props.loading && (
                    <CardContent>
                        {props.children}
                    </CardContent>
                )}
            </CardBody>
        </CustomCardMui>
    );
}


