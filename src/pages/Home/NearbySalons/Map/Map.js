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
import SalonsCarousel from "./SalonsCarousel/SalonsCarousel";
import styled from "styled-components";

import { NavLink } from "react-router-dom";

const libraries = ["places"];

const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
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

const SliderWrapper = styled.div`
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    @media screen and (max-width: 500px) {
        bottom: 25px;
    }
`

const InfoBody = styled.div`
    padding: 10px;
    padding-right: 0;
    a {
        font-size: 17px;
        line-height: 1.4;
        font-weight: 600;
        font-family: ${ ( {theme}  ) => theme.fonts.ar };
        margin-bottom: 5px;
        color: ${({ theme }) => theme.vars.theme};
    }
    h4 {
        font-size: 16px;
        line-height: 1.4;
        font-weight: 600;
        font-family: ${ ( {theme}  ) => theme.fonts.ar };
        color: ${({ theme }) => theme.palette.common.black };
    }
`

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
                onLoad={ onMapLoad } options={options}
                zoom={8} center={center} >
                {markers.map(marker => (
                    <Marker
                        key={marker.data.id}
                        position={{ lat: +marker.lat, lng: +marker.lng }}
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
                        position={{ lat: +selected.lat, lng: +selected.lng }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <InfoBody>
                            <NavLink to={`../salons/${selected.data.id}`}>
                                {selected.data.name}
                            </NavLink>
                            <h4>{selected.data.address}</h4>
                        </InfoBody>
                    </InfoWindow>
                ) : null}
                <Locate panTo={panTo} />
                <SliderWrapper>
                    <SalonsCarousel salons={markers} handleClick={panTo} />
                </SliderWrapper>
            </GoogleMap>
        </div>
    )
}

export default Map;