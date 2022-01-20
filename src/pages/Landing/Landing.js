import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Landing = props => {

    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home')
    }, [navigate])


    return (
        <></>
    )
}
export default Landing;