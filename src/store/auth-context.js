import React, { useState }  from"react";

const AuthContext = React.createContext({
    token: '',
    roleId: '',
    roleName: '',
    isLoggedIn: false,
    login: ( ) => { },
    logout: ( ) => { },
})

export const AuthContextProvider = props => {

    const intialToken = localStorage.getItem('token');
    const intialRoleId = localStorage.getItem('roleId');
    const intialRoleName = localStorage.getItem('roleName');

    const [ token , setToken ] = useState(intialToken);
    const [ roleId , setRoleId ] = useState(intialRoleId);
    const [ roleName , setRoleName ] = useState(intialRoleName);

    const userIsLoggedIn = !!token;

    const loginHandler = ( token, roleId, roleName ) => {
        setToken(token);
        localStorage.setItem('token', token);
        setRoleId(roleId);
        localStorage.setItem('roleId', roleId);
        setRoleName(roleName);
        localStorage.setItem('roleName', roleName);
    }

    const logoutHandler = ( ) => {
        setToken(null);
        localStorage.removeItem('token')
        setRoleId(null);
        localStorage.removeItem('roleId')
        setRoleName(null);
        localStorage.removeItem('roleName')
    }

    const contextValue = {
        token: token,
        roleId: roleId,
        roleName: roleName,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext