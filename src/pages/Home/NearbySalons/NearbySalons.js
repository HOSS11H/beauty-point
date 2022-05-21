import { useEffect } from "react";
import { useState } from "react";
import SalonsMap from "./SalonsMap/SalonsMap";
import axios from '../../../utils/axios-instance'
import Loader from "../../../components/UI/Loader/Loader";
import { toast } from "react-toastify";

const NearbySalons = props => {

    const [loading, setLoading] = useState(true);
    const [salons, setSalons] = useState([]);
    const [center, setCenter] = useState({})

    useEffect(() => {
        if ( salons.length === 0 ) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCenter({ lat: latitude, lng: longitude });
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
                        toast.error("Something went wrong Plase try again later");
                    });
            })
        }
    }, [salons.length])

    let content = <Loader height='100vh' />;

    if (salons.length > 0) {
        content = <SalonsMap salons={salons} center={center} />;
    }


    return (
        <>
            {content}
        </>
    )
}
export default NearbySalons;