import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const StyledToastifyContainer = styled(ToastContainer)`
    // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity Or you can use CSS variables if you want to override just colors : https://fkhadra.github.io/react-toastify/how-to-style#override-css-variables
    &&&.Toastify__toast-container {
    }
    .Toastify__toast {}
    .Toastify__toast-body {
        font-family: ${ ( { theme } ) => theme.direction === "ltr" ? "'Poppins', sans-serif" : "'Cairo', sans-serif"};
    }
    .Toastify__progress-bar {}
`;