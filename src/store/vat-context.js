import React, { useState } from "react";

const VatContext = React.createContext({
    vat: '',
    toggleVat: () => { },
})

export const VatContextProvider = (props) => {

    const intialVat = (localStorage.getItem('vat') === 'true') && true;

    const [vat, setVat] = useState(intialVat);

    const toggleVat = () => {
        setVat(!vat);
        localStorage.setItem('vat', !vat);
    }

    const contextValue = {
        vat: vat,
        toggleVat: toggleVat,
    }

    return <VatContext.Provider value={contextValue}>{props.children}</VatContext.Provider>

}

export default VatContext;