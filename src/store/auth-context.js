import React, { useState }  from"react";

const AuthContext = React.createContext({
    token: '',
    roleId: '',
    isLoggedIn: false,
    login: ( ) => { },
    logout: ( ) => { },
})

export const AuthContextProvider = props => {

    const intialToken = localStorage.getItem('token');
    const intialRoleId = localStorage.getItem('roleId');

    const [ token , setToken ] = useState(intialToken);
    const [ roleId , setRoleId ] = useState(intialRoleId);

    const userIsLoggedIn = !!token;

    const loginHandler = ( token, roleId ) => {
        setToken(token);
        localStorage.setItem('token', token);
        setRoleId(roleId);
        localStorage.setItem('roleId', roleId);
    }

    const logoutHandler = ( ) => {
        setToken(null);
        localStorage.removeItem('token')
        setRoleId(null);
        localStorage.removeItem('roleId')
    }

    const contextValue = {
        token: token,
        roleId: roleId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext