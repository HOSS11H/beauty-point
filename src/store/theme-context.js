import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

const ThemeContext = React.createContext({
    mode: 'light',
    direction: 'ltr',
    lang: 'en',
    toggleMode: ( ) => { },
    toggleDirection: ( ) => { },
    toggleLanguage: ( ) => { },
    theme: null,
})

export const ThemeContextProvider = props => {

    const [ mode, setMode ] = useState('light');
    const [ direction, setDirection ] = useState('ltr');
    const [ language, setLanguage ] = useState('en');

    const toggleModeHandler = ( ( ) => {
        setMode( prevState => (prevState === 'light' ? 'dark' : 'light') );
    } )
    const toggleDirectionHandler = ( ( ) => {
        setDirection( prevState => (prevState === 'ltr' ? 'rtl' : 'ltr') );
    } )
    const toggleLanguageHandler = ( ( ) => {
        setLanguage( prevState => (prevState === 'en' ? 'ar' : 'en') );
    } )
    
    const theme = React.useMemo(
        ( ) =>
            createTheme({
                direction: direction,
                vars: {
                    primary: '#EF14E2',
                    black: '#000000',
                    white: '#f4f4f4',
                },
                fonts: {
                    ar: "'Cairo', sans-serif",
                    en: "'Poppins', sans-serif",
                },
                palette: {
                    mode,
                },
                typography: {
                    fontFamily: direction === 'ltr' ? "'Poppins', sans-serif" : "'Cairo', sans-serif",
                },
            }),
        [mode, direction],
    );
    

    const contextValue = {
        mode: mode,
        direction: direction,
        lang: language,
        toggleMode: toggleModeHandler,
        toggleDirection: toggleDirectionHandler,
        toggleLanguage: toggleLanguageHandler,
        theme: theme,
    }
    // We Use Styled Componet To Pass The Theme
    // We Pass The Theme Through The Context To Access It In Our Components
    // We Use Styled Engin To Customize MUI Components

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContext