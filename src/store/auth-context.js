import React, { useState }  from"react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: ( ) => { },
    logout: ( ) => { },
})

export const AuthContextProvider = props => {

    const intialToken = localStorage.getItem('syndToken');

    const [ token , setToken ] = useState(intialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = ( token ) => {
        setToken(token);
        localStorage.setItem('syndToken', token);
    }

    const logoutHandler = ( ) => {
        setToken(null);
        localStorage.removeItem('syndToken')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext