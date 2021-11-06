import React from 'react';
import  styled  from 'styled-components';

const BackdropWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    @media screen and (min-width: 768px) {
        display: none;
    }
`

const Backdrop = (props) => (
    props.show ? <BackdropWrapper onClick={props.remove}></BackdropWrapper> : null
);
export default Backdrop;