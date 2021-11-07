import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'

import { BrowserRouter } from 'react-router-dom';

import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";

import { ThemeContextProvider } from './store/theme-context';
import GlobalStyle from './styles/globalStyles';

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
          <GlobalStyle />
          <StyleSheetManager stylisPlugins={[rtlPlugin]}>
            <App />
          </StyleSheetManager>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render( app , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
