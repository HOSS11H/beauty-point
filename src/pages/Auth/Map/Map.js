import {
    GoogleMap,
    useLoadScript,
    Marker,
} from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
    width: "100%",
    height: "300px",
    margin: "20px auto",
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const Map = props => {

    const { assignCoords, marker } = props;

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC3k16YcaG8bZDLFUMEdwoXglBiO6fQRA0',
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    const handleClick = e => {
        assignCoords(e.latLng.lat(), e.latLng.lng());
    }

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} 
                onClick={ handleClick } options={options}
                zoom={8} center={ marker.lat ? { lat: marker.lat, lng: marker.lng } : { lat: 24.635588, lng: 46.724565 }}>
                    {
                        marker.lat && (
                            <Marker
                                key={marker.lat}
                                position={{ lat: marker.lat, lng: marker.lng }} />
                        )
                    }
            </GoogleMap>
        </div>
    )
}

export default Map;