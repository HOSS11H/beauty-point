import { useEffect } from "react";
import { useState } from "react";
import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import Map from "./Map/Map";
import axios from '../../../utils/axios-instance'
import Loader from "../../../components/UI/Loader/Loader";

const NearbySalons = props => {

    const [loading, setLoading] = useState(true);
    const [salons, setSalons] = useState([]);

    useEffect(() => {
        if ( salons.length === 0 ) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                axios.get(`/nearby?lat=${latitude}&long=${longitude}&radius=70000`)
                    .then(res => {
                        setSalons(res.data.data);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
        }
    }, [salons.length])

    let content = <Loader height='300px' />;

    if (salons.length > 0) {
        content = <Map salons={salons} />;
    }


    return (
        <HomeLayout>
            {content}
        </HomeLayout>
    )
}
export default NearbySalons;