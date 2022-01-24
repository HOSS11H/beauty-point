import { useEffect } from "react";
import { useState } from "react";
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
                axios.get(`/nearby?lat=${latitude}&long=${longitude}&radius=70000&include[]=vendor_page`)
                    .then(res => {
                        const fetchedSalons = res.data.data.map(salon => {
                            return {
                                lat: salon.vendor_page.latitude,
                                lng: salon.vendor_page.longitude,
                                data: {
                                    id: salon.id,
                                    name: salon.companyName,
                                    address: salon.address,
                                    phone: salon.companyPhone,
                                    image: salon.logo_url,
                                }
                            }
                        });
                        setSalons(fetchedSalons);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
        }
    }, [salons.length])

    let content = <Loader height='100vh' />;

    if (salons.length > 0) {
        content = <Map salons={salons} />;
    }


    return (
        <>
            {content}
        </>
    )
}
export default NearbySalons;