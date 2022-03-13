import { useCallback } from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import compassImg from './compass.svg';

const LocateBtn = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    z-index: 10;
`
const LocateBtnImg = styled.img`
    width: 30px;
    cursor: pointer;
`

const  Locate = ( { panTo } ) => {
    
    const locateMe = useCallback(() => {
        navigator.geolocation.getCurrentPosition( ( position ) => {
            panTo( { lat: position.coords.latitude, lng: position.coords.longitude } );
        } );
    }, [panTo])
    
    return (
        <LocateBtn onClick={ ( ) => locateMe() }>
            <LocateBtnImg src={ compassImg } alt="Locate" />
        </LocateBtn>
    )
}
export default Locate;