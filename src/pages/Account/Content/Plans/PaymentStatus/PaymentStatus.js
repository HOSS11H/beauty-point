// http://localhost:3000/account/plans/status
// ?PaymentId=2208718401007110120
// &TranId=2208718401007110120&ECI=02
// &Result=Successful
// &TrackId=589101
// &AuthCode=091795
// &ResponseCode=000
// &RRN=208715091795
// &responseHash=c7b17a254b4ad789b7dfcd91b760bdd84d132e8f682d5346f408c008bc349573
// &amount=100.00
// &cardBrand=MASTER
// &UserField1=
// &UserField3=monthly
// &UserField4=5
// &UserField5=
// &maskedPAN=512345XXXXXX0008
// &cardToken=
// &SubscriptionId=null
// &email=null
// &payFor=null
import v1 from '../../../../../utils/axios-instance-v1';
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Loader from '../../../../../components/UI/Loader/Loader';

const PaymentStatus = props => {

    const { t } = useTranslation()
    const navigate = useNavigate()

    const [sendingReq, setSendReq] = useState(false);

    const [searchParams] = useSearchParams()

    const paymentId = searchParams.get("PaymentId")
    const tranId = searchParams.get("TranId")
    const trackId = searchParams.get("TrackId")
    const responseCode = searchParams.get("ResponseCode")
    const responseHash = searchParams.get("responseHash")
    const amount = searchParams.get("amount")
    const packageType = searchParams.get("UserField3")
    const packageId = searchParams.get("UserField4")

    useEffect(() => {
        if (responseCode === "000") {
            setSendReq(true)
            const data = {
                paymentId,
                tranId,
                trackId,
                responseHash,
                amount,
                packageType,
                packageId
            }
            v1.post('/vendors/payments/status', data)
                .then(res => {
                    if (res.status === 200) {
                        toast.success(t('Paid Successfully'), {
                            position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                            closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                        });
                        setSendReq(false)
                    }
                })
                .catch(err => {
                    setSendReq(false)
                    toast.error(t('Paid Failed'), {
                        position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                        closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
                    });
                })
            navigate('/account/plans')
        } else {
            setSendReq(false)
            toast.error(t('Paid Failed'), {
                position: "bottom-right", autoClose: 4000, hideProgressBar: true,
                closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined
            });
            navigate('/account/plans')
        }
    }, [amount, navigate, packageId, packageType, paymentId, responseCode, responseHash, searchParams, t, trackId, tranId])


    return (
        <>
            {sendingReq && <Loader height='400px' />}
        </>
    )
}
export default PaymentStatus;