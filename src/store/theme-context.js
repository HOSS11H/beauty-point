import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';


const ThemeContext = React.createContext({
    mode: '',
    direction: '',
    lang: '',
    city: '',
    toggleMode: ( ) => { },
    toggleDirection: ( ) => { },
    toggleLanguage: ( ) => { },
    selectCity: ( ) => { },
    theme: null,
})

export const ThemeContextProvider = props => {

    const { i18n } = useTranslation();

    const intialMode = localStorage.getItem('mode') || "light";
    const intialDirection = localStorage.getItem('direction') || "rtl";
    const intialLanguage = localStorage.getItem('language') || 'ar';
    const intialCity = localStorage.getItem('city') || null;

    const [ mode, setMode ] = useState(intialMode);
    const [ direction, setDirection ] = useState(intialDirection);
    const [ language, setLanguage ] = useState(intialLanguage);
    const [ city, setCity ] = useState(intialCity);

    document.getElementsByTagName('body')[0].dir = direction;
    
    const toggleModeHandler = ( ( ) => {
        setMode( prevState =>{
            if(prevState === "dark"){
                localStorage.setItem('mode', "light");
                return "light";
            }
            else{
                localStorage.setItem('mode', "dark");
                return "dark";
            }
        });
    } )
    const toggleDirectionHandler = ( ( ) => {
        setDirection( prevState =>{
            if(prevState === "ltr"){
                localStorage.setItem('direction', "rtl");
                return "rtl";
            }
            else{
                localStorage.setItem('direction', "ltr");
                return "ltr";
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
            if( prevState === "ltr" ){
                localStorage.setItem('direction', "rtl");
                return "rtl";
            } else {
                localStorage.setItem('direction', "ltr");
                return "ltr";
            }
        } );
    } )
    const selectCityHandler = ( id ) => {
        setCity( id );
        localStorage.setItem('city', id);
    }
    
    const theme = React.useMemo(
        ( ) =>
            createTheme({
                direction: direction,
                vars: {
                    primary: '#EF14E2',
                    theme: '#96248E',
                    secondary: '#96248e',
                },
                fonts: {
                    ar: "'Cairo', sans-serif",
                    en: "'Poppins', sans-serif",
                },
                palette: {
                    mode,
                },
                typography: {
                    fontFamily: direction === "ltr" ? "'Poppins', sans-serif" : "'Cairo', sans-serif",
                },
            }),
        [mode, direction],
    );
    
    const contextValue = {
        mode: mode,
        direction: direction,
        lang: language,
        city: city,
        toggleMode: toggleModeHandler,
        toggleDirection: toggleDirectionHandler,
        toggleLanguage: toggleLanguageHandler,
        selectCity: selectCityHandler,
        theme: theme,
    }
    // We Use Styled Componet To Pass The Theme
    // We Pass The Theme Through The Context To Access It In Our Components

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={contextValue.theme}>
                <ThemeProvider theme={contextValue.theme}>
                    {props.children}
                </ThemeProvider>
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContext