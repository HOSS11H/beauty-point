import { Box, Button } from "@mui/material";
import axios from 'axios';
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "../../../../components/UI/Loader/Loader";
import v1 from '../../../../utils/axios-instance-v1';
import AllPlans from "./AllPlans/AllPlans";
import CurrentPlan from "./CurrentPlan/CurrentPlan";
import PlansInvoices from "./PlansInvoices/PlansInvoices";

const Plans = props => {

    const { t } = useTranslation()

    const [currentPlan, setCurrentPlan] = useState(null);
    const [loading, setLoading] = useState(false)

    const [showAllPlans, setShowAllPlans] = useState(false)

    useEffect(() => {
        setLoading(true)
        const controller = new AbortController();
        const getCurrentPlanData = v1.get('/vendors/package')
        axios.all([getCurrentPlanData], {
            signal: controller.signal
        })
            .then(axios.spread((currentPlan) => {
                setCurrentPlan(currentPlan.data.data)
                setLoading(false)
            }))
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    const toggleShowPackages = () => {
        setShowAllPlans( prevState => !prevState )
    }

    let content;

    if (loading) {
        content = <Loader height='400px' />
    }

    if (currentPlan && !loading) {
        content = (
            <Fragment>
                <CurrentPlan plan={currentPlan} />
                <PlansInvoices />
                <Box sx={{  margin: '40px auto', textAlign: 'center' }}>
                    <Button onClick={toggleShowPackages} variant='contained' color='secondary'>{t(`${showAllPlans ? 'hide all plans' : 'show all plans'}`)}</Button>
                </Box>
                {showAllPlans && <AllPlans  currentPlanId={currentPlan.id} />}
            </Fragment>
        )
    }

    return (
        <>
            {content}
        </>
    )
}
export default Plans
