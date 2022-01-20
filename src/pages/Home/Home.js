import { useEffect } from "react";
import { useContext, useState } from "react";
import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import ThemeContext from "../../store/theme-context";
import LocationSelector from "./LocationSelector/LocationSelector";

const Home = props => {

    const themeCtx = useContext(ThemeContext);
    const { city, selectCity } = themeCtx;

    const [ locationSelectorOpened, setLocationSelectorOpened ] = useState(false)

    useEffect(() => {
        !city && setLocationSelectorOpened(true)
    }, [city])

    const selectLocationHandler = (city) => {
        selectCity(city)
        setLocationSelectorOpened(false)
    }

    return (
        <Fragment>
            <LocationSelector show={locationSelectorOpened} onConfirm={selectLocationHandler} />
            <Outlet />
        </Fragment>
    )
}
export default Home;