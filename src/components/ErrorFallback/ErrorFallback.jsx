import {Wrapper} from './ErrorFallback.styled';
import Lottie from "lottie-react";
import oopsAnimation from '../../assets/animations/oops.json'
import { Button } from '@mui/material';


export function ErrorFallback({ error, resetErrorBoundary }) {
    console.log('rendered')
    return (
        <Wrapper>
            <Lottie animationData={oopsAnimation} loop />
            <Button color='primary' variant='contained' onClick={resetErrorBoundary}>Try again</Button>
        </Wrapper>
    );
}
