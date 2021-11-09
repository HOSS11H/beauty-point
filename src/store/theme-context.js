import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';

const ThemeContext = React.createContext({
    mode: 'light',
    direction: 'ltr',
    toggleMode: ( ) => { },
    toggleDirection: ( ) => { },
    theme: null,
})

export const ThemeContextProvider = props => {

    const [ mode, setMode ] = useState('light');
    const [ direction, setDirection ] = useState('ltr');

    const toggleModeHandler = ( ( ) => {
        setMode( prevState => (prevState === 'light' ? 'dark' : 'light') );
    } )
    const toggleDirectionHandler = ( ( ) => {
        setDirection( prevState => (prevState === 'ltr' ? 'rtl' : 'ltr') );
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
            }),
        [mode, direction],
    );
    

    const contextValue = {
        mode: mode,
        direction: direction,
        toggleMode: toggleModeHandler,
        toggleDirection: toggleDirectionHandler,
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