import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const VendorMap = (props) => {
    const { marker } = props;
    return (
        <div style={{ height: '400px', margin: "20px auto" }}>
            <MapContainer center={marker ? [ marker.lat, marker.lng ] : [24.635588, 46.724565]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[marker.lat, marker.lng] } />
            </MapContainer>
        </div>
    )
}
export default VendorMap;