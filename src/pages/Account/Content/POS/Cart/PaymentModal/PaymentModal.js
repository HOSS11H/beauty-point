import { useEffect, useState } from "react";
import { POSModal } from "../../../../../../components/UI/POSModal/POSModal";

const PaymentModal = props => {

    const { open, handleClose } = props;

    const [paymentGateway, setPaymentGateway] = useState('card')
    const [paymentGatewayError, setPaymentGatewayError] = useState(false)

    const [paidAmount, setPaidAmount] = useState(0)
    const [paidAmountError, setPaidAmountError] = useState(false)
    const [cashToReturn, setCashToReturn] = useState(0)
    const [cashRemainig, setCashRemainig] = useState(0)

    const [coupons, setCoupons] = useState([]);

    const [coupon, setCoupon] = useState('')
    const [couponExists, setCouponExists] = useState(false)
    const [couponData, setCouponData] = useState({ amount: 0 })

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() =>
            setDateTime(new Date())
            , 60000);
        return () => clearInterval(interval);
    }, [])

    return (
        <POSModal open={open} handleClose={handleClose} heading='Pay' >
        </POSModal>
    )
}
export default PaymentModal;