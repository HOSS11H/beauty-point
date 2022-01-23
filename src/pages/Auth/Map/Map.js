import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import { mapStyles } from "./mapStyles";

const libraries = ["places"];

const mapContainerStyle = {
    width: "100%",
    height: "300px",
    margin: "20px auto",
}

const center = {
    lat: 21.485811,
    lng: 39.192505,
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

const Map = props => {

    const { assignCoords, markers } = props;

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
                onClick={ handleClick }
                zoom={8} center={center} >
                {markers.map(marker => (
                    <Marker
                        key={marker.lat}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => console.log("You clicked me!")}
                    />
                ))}
            </GoogleMap>
        </div>
    )
}

export default Map;