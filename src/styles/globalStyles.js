// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html {
        overflow: auto;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: ${({ theme }) => theme.direction === 'rtl' ? theme.fonts.ar : theme.fonts.en};
        text-align: left;
        font-size: 16px;
        overflow-x: hidden;
        background-color: ${({ theme }) => theme.palette.background.default};
        color: ${({ theme }) => theme.palette.text.primary};
    }
    button {
        font-family: ${({ theme }) => theme.direction === 'rtl' ? theme.fonts.ar : theme.fonts.en};
    }
    h1, h2, h3, h4, h5, h6 {
        margin: 0;
        color: ${({ theme }) => theme.palette.text.primary};
    }
    p {
        margin: 0;
    }
    a {
        text-decoration: none;
    }
    .leaflet-container {
        width: 100%;
        height: 100%;
        z-index: 1;
    }
`;

export default GlobalStyle;