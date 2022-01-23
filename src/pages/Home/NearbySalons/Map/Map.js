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

import markerImg from '../../../../images/marker/marker.png';
import Locate from "./Locate/Locate";
import { useEffect } from "react";

const libraries = ["places"];

const mapContainerStyle = {
    width: "100%",
    height: "300px",
    margin: "20px auto",
    position: "relative",
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

const Map = ( { salons } ) => {

    const [markers, setMarkers] = useState(salons);

    const [selected, setSelected] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC3k16YcaG8bZDLFUMEdwoXglBiO6fQRA0',
        libraries,
    });

    
    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);
    
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle} 
                onLoad={ onMapLoad }
                zoom={8} center={center} >
                {markers.map(marker => (
                    <Marker
                        key={marker.latitude}
                        position={{ lat: marker.latitude, lng: marker.longitude }}
                        icon={{
                            url: markerImg,
                            scaledSize: new window.google.maps.Size(50, 50),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(25, 25),
                        }}
                        onClick={() => setSelected(marker)}
                    />
                ))}
                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div>
                            salon name
                            {selected.time}
                        </div>
                    </InfoWindow>
                ) : null}
                <Locate panTo={panTo} />
            </GoogleMap>
        </div>
    )
}

export default Map;