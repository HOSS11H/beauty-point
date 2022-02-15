import Card from '@mui/material/Card';
import styled from 'styled-components';

const CustomMessage = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: ${ props => props.height || '70vh' };
    flex-grow: 1;
    p {
        font-size: 34px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
        @media screen and (max-width: 899.98px) {
            font-size: 26px;
        }
    }
`

const SearchMessage = ( props ) => {

    const { height } = props;

    return (
        <CustomMessage height={height} >
            <p>{props.children}</p>
        </CustomMessage>
    )
}

export default SearchMessage;