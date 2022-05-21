import { useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'

import Locate from './Locate/Locate';

const LocationMarker = ( { assignCoords, marker } ) => {
    const [position, setPosition] = useState(marker ? [marker.lat, marker.lng] :null)
    const markerRef = useRef(null)
    const map = useMapEvents({
        click() {
            !position && map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            assignCoords(e.latlng.lat, e.latlng.lng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                    assignCoords(marker.getLatLng().lat, marker.getLatLng().lng)
                }
            },
        }),
        [assignCoords],
    )

    return position === null ? null : (
        <Marker ref={markerRef} position={position} draggable eventHandlers={eventHandlers}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

const VendorMap = (props) => {
    const { assignCoords, marker } = props;
    return (
        <div style={{ height: '400px', margin: "20px auto" }}>
            <MapContainer center={marker ? [ marker.lat, marker.lng ] : [24.635588, 46.724565]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker assignCoords={assignCoords} marker={marker} />
                <Locate />
            </MapContainer>
        </div>
    )
}
export default VendorMap;