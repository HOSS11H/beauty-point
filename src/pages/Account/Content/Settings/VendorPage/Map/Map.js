import styled from "styled-components";
import GoogleMapReact from 'google-map-react';

const MapContainer = styled.div`
    height: 300px
`
const containerStyle = {
    width: '400px',
    height: '400px'
};


const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map(props) {

    const { lat, lng } = props;

    //console.log(lat, lng)

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAnAy9cvbtUyQRDiKP8Ojee0CtUwy238sQ" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={props.lat}
                    lng={props.lng}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}