import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import markerImg from '../../../../images/marker/marker.png';
import Locate from './Locate/Locate';
import SalonsCarousel from './SalonsCarousel/SalonsCarousel';


let markerIcon = L.icon({
    iconUrl: markerImg,
    iconRetinaUrl: markerImg,
    iconSize: [50, 50],
    iconAnchor:   [25, 25],
    popupAnchor:  [1, -25]
});

const MapWrapper = styled.div`
    position: relative;
    height: 100vh;
`

const SliderWrapper = styled.div`
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    z-index:1000;
    @media screen and (max-width: 500px) {
        bottom: 25px;
    }
`


const InfoBody = styled.div`
    padding: 10px;
    padding-right: 0;
    position: relative;
    z-index:2;
    a {
        font-size: 17px;
        line-height: 1.4;
        font-weight: 600;
        font-family: ${({ theme }) => theme.fonts.ar};
        margin-bottom: 5px;
        color: ${({ theme }) => theme.vars.theme};
    }
    h4 {
        font-size: 16px;
        line-height: 1.4;
        font-weight: 600;
        font-family: ${({ theme }) => theme.fonts.ar};
        color: ${({ theme }) => theme.palette.common.black};
    }
`

const SalonsMap = ({ salons, center }) => {

    return (
        <MapWrapper>
            <MapContainer  center={center} zoom={8}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {salons.map((marker, index) => {
                    return (
                        <Marker key={index} position={[+marker.lat, +marker.lng]} icon={markerIcon}>
                            <Popup>
                                <InfoBody>
                                    <NavLink to={`../salons/${marker.data.id}`}>
                                        {marker.data.name}
                                    </NavLink>
                                    <h4>{marker.data.address}</h4>
                                </InfoBody>
                            </Popup>
                        </Marker>
                    )
                })}
                <Locate />
                <SliderWrapper>
                    <SalonsCarousel salons={salons} />
                </SliderWrapper>
            </MapContainer>
        </MapWrapper>
    )
}
export default SalonsMap;