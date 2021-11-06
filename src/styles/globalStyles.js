// globalStyles.js
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }
    p {
        margin: 0;
    }
    a {
        text-decoration:none;
    }
`;

export default GlobalStyle;