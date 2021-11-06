import React  from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItemsWrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    text-align: center;
    margin-bottom: 50px;
    @media (min-width: 768px) {
        flex-flow: row;
        margin-bottom: 0px
    }
`

const NavigationItems = ( props ) => {
    
    return (
        <NavigationItemsWrapper >
            <NavigationItem link='/posts' >posts</NavigationItem>
            <NavigationItem link='/testimonials' >testimonials</NavigationItem>
        </NavigationItemsWrapper>
    )
};

export default NavigationItems;