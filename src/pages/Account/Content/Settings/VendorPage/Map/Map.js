import styled from "styled-components";
import { GoogleMap, LoadScript, Marker  } from '@react-google-maps/api';

const MapContainer = styled.div`
    height: 300px
`
const containerStyle = {
    width: '400px',
    height: '400px'
};

const Map = props => {

    const {lat, lng} = props;

    return (
        <LoadScript
            googleMapsApiKey="YOUR_API_KEY"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat, lng }}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <Marker draggable position={{ lat, lng }} ></Marker>
            </GoogleMap>
        </LoadScript>
    )
}
export default Map;