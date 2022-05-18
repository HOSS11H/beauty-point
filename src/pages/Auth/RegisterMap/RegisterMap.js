import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useMemo, useRef, useState } from 'react';

const LocationMarker = ( { assignCoords } ) => {
    const [position, setPosition] = useState(null)
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

const RegisterMap = (props) => {
    const { assignCoords } = props;
    return (
        <div style={{ height: '300px', margin: "20px auto" }}>
            <MapContainer center={[24.635588, 46.724565]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker assignCoords={assignCoords} />
            </MapContainer>
        </div>
    )
}
export default RegisterMap;