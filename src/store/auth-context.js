import React, { useState }  from"react";

const AuthContext = React.createContext({
    token: '',
    roleId: '',
    userLetter: '',
    isLoggedIn: false,
    login: ( ) => { },
    logout: ( ) => { },
})

export const AuthContextProvider = props => {

    const intialToken = localStorage.getItem('token');
    const intialRoleId = localStorage.getItem('roleId');
    const intialUserLetter = localStorage.getItem('userLetter');

    const [ token , setToken ] = useState(intialToken);
    const [ roleId , setRoleId ] = useState(intialRoleId);
    const [ userLetter , setUserLetter ] = useState(intialUserLetter);

    const userIsLoggedIn = !!token;

    const loginHandler = ( token, roleId, letter ) => {
        setToken(token);
        localStorage.setItem('token', token);
        setRoleId(roleId);
        localStorage.setItem('roleId', roleId);
        setUserLetter(letter);
        localStorage.setItem('userLetter', letter);
    }

    const logoutHandler = ( ) => {
        setToken(null);
        localStorage.removeItem('token')
        setRoleId(null);
        localStorage.removeItem('roleId')
        setUserLetter(null);
        localStorage.removeItem('userLetter')
    }

    const contextValue = {
        token: token,
        roleId: roleId,
        userLetter: userLetter,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext