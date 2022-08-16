import { Card } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useCallback } from "react";
import ChooseCustomer from "./ChooseCustomer/ChooseCustomer";

const Wrapper = styled(Card)`
    &.MuiPaper-root {
        padding: 8px;
    }
`


const Cart = props => {

    const { t } = useTranslation()

    const defaultCustomer = useMemo( () => {
        return {
            id: '',
            name: t('passing customer'),
        }
    }, [t])
    const [customerData, setCustomerData] = useState(defaultCustomer);



    const customerAddHandler = useCallback((val) => {
        setCustomerData(val)
    }, [])
    const customerDeleteHandler = useCallback(() => {
        setCustomerData(defaultCustomer)
    }, [defaultCustomer])

    return (
        <Wrapper>
            <ChooseCustomer customerData={customerData} chooseCustomer={customerAddHandler} deleteCustomer={customerDeleteHandler}  />
        </Wrapper>
    )
}
export default Cart;