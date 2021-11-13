import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';

const ThemeContext = React.createContext({
    mode: '',
    direction: '',
    lang: '',
    toggleMode: ( ) => { },
    toggleDirection: ( ) => { },
    toggleLanguage: ( ) => { },
    theme: null,
})

export const ThemeContextProvider = props => {

    const { t, i18n } = useTranslation();

    const intialMode = localStorage.getItem('mode') || 'light';
    const intialDirection = localStorage.getItem('direction') || 'rtl';
    const intialLanguage = localStorage.getItem('language') || 'ar'; ;


    const [ mode, setMode ] = useState(intialMode);
    const [ direction, setDirection ] = useState(intialDirection);
    const [ language, setLanguage ] = useState(intialLanguage);

    document.getElementsByTagName('body')[0].dir = direction;

    
    const toggleModeHandler = ( ( ) => {
        setMode( prevState =>{
            if(prevState === 'dark'){
                localStorage.setItem('mode', 'light');
                return 'light';
            }
            else{
                localStorage.setItem('mode', 'dark');
                return 'dark';
            }
        });
    } )
    const toggleDirectionHandler = ( ( ) => {
        setDirection( prevState =>{
            if(prevState === 'ltr'){
                localStorage.setItem('direction', 'rtl');
                return 'rtl';
            }
            else{
                localStorage.setItem('direction', 'ltr');
                return 'ltr';
            }
        } );
        setLanguage( prevState =>{
            if(prevState === 'en'){
                localStorage.setItem('language', 'ar');
                return 'ar';
            }
            else{
                localStorage.setItem('language', 'en');
                return 'en';
            }
        } );
    } )
    const toggleLanguageHandler = ( ( ) => {
        setLanguage( prevState =>{
            if( prevState === 'en' ){
                i18n.changeLanguage('ar');
                localStorage.setItem('language', 'ar');
                return 'ar';
            } else {
                i18n.changeLanguage('en');
                localStorage.setItem('language', 'en');
                return 'en';
            }
        });
        setDirection( prevState =>{
            if( prevState === 'ltr' ){
                localStorage.setItem('direction', 'rtl');
                return 'rtl';
            } else {
                localStorage.setItem('direction', 'ltr');
                return 'ltr';
            }
        } );
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
    console.log(contextValue);

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={contextValue.theme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContext