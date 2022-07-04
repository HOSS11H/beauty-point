import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = props => {
    const navigate = useNavigate()
    
    useEffect( () => {
        navigate('/home')
    }, [navigate])

    return (
        <Fragment>
        </Fragment>
    )
}
export default Landing;