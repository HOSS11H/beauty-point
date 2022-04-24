import React, { useState }  from"react";

const AuthContext = React.createContext({
    token: '',
    roleId: '',
    roleName: '',
    userLetter: '',
    userId: '',
    isLoggedIn: false,
    login: ( ) => { },
    logout: ( ) => { },
})

export const AuthContextProvider = props => {

    const intialToken = localStorage.getItem('token');
    const intialRoleId = localStorage.getItem('roleId');
    const intialRoleName = localStorage.getItem('roleName');
    const intialUserLetter = localStorage.getItem('userLetter');
    const intialUserId = localStorage.getItem('userId');

    const [ token , setToken ] = useState(intialToken);
    const [ roleId , setRoleId ] = useState(intialRoleId);
    const [ roleName , setRoleName ] = useState(intialRoleName);
    const [ userLetter , setUserLetter ] = useState(intialUserLetter);
    const [ userId , setUserId ] = useState(intialUserId);


    const userIsLoggedIn = !!token;

    const loginHandler = ( token, roleId, letter, userId, roleName ) => {
        setToken(token);
        localStorage.setItem('token', token);
        setRoleId(roleId);
        localStorage.setItem('roleId', roleId);
        setUserLetter(letter);
        localStorage.setItem('roleName', roleName);
        setRoleName(roleName);
        localStorage.setItem('userLetter', letter);
        setUserId(userId);
        localStorage.setItem('userId', userId);
    }

    const logoutHandler = ( ) => {
        setToken(null);
        localStorage.removeItem('token')
        setRoleId(null);
        localStorage.removeItem('roleId')
        setRoleName(null);
        localStorage.removeItem('roleName')
        setUserLetter(null);
        localStorage.removeItem('userLetter')
        setUserId(null);
        localStorage.removeItem('userId')
    }

    const contextValue = {
        token: token,
        roleId: roleId,
        roleName: roleName,
        userLetter: userLetter,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext