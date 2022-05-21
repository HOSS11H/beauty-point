import { useMap } from 'react-leaflet';
import styled from 'styled-components';

import compassImg from './compass.svg';

const LocateBtn = styled.button`
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: none;
    border: none;
    z-index: 1000;
`
const LocateBtnImg = styled.img`
    width: 30px;
    cursor: pointer;
`

const  Locate = (  ) => {

    const map = useMap();
    const handleCompassClick = (() => {
        map.locate()
        map.on('locationfound', (e) => {
            map.flyTo(e.latlng, 14)
        })
    })
    
    return (
        <LocateBtn onClick={handleCompassClick} >
            <LocateBtnImg src={ compassImg } alt="Locate" />
        </LocateBtn>
    )
}
export default Locate;