import { Fragment } from "react"
import { Outlet } from "react-router-dom"

const Home = props => {
    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}
export default Home;