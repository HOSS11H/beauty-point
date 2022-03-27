import { Fragment, useEffect, useState } from "react"
import AllPlans from "./AllPlans/AllPlans"
import CurrentPlan from "./CurrentPlan/CurrentPlan"
import axios from '../../../../utils/axios-instance-v1';
import Loader from "../../../../components/UI/Loader/Loader";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

const Plans = props => {

    const { t } = useTranslation()

    const [currentPlan, setCurrentPlan] = useState(null);
    const [loading, setLoading] = useState(false)

    const [showAllPlans, setShowAllPlans] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('/vendors/package')
            .then(res => {
                setLoading(false)
                setCurrentPlan(res.data.data);
            })
            .catch(err => {
                //console.log(err);
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
                <Box sx={{  margin: '40px auto', textAlign: 'center' }}>
                    <Button onClick={toggleShowPackages} variant='contained' color='secondary'>{t(`${showAllPlans ? 'hide all plans' : 'show all plans'}`)}</Button>
                </Box>
                {showAllPlans && <AllPlans  currentPlan={currentPlan} />}
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
