import React from 'react';

import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure( { adapter : new Adapter( ) } );

describe(' <NavigationItems /> ' , ( ) => {

    let wrapper;
    // Excuted Before Each Test 
    beforeEach ( ( ) => {
        wrapper = shallow( <NavigationItems /> );
    } ) ;
    // First Test
    it(' should render two <NavigationItem /> elements if not Authenticated ' , ( ) => {
        expect( wrapper.find( NavigationItem ) ).toHaveLength(2);
    });
    // Second test
    it(' should render three <NavigationItem /> elements if Authenticated ' , ( ) => {
        // Setting Props To Our Shallow Component.
        wrapper.setProps({isAuth : true });
        expect( wrapper.find( NavigationItem ) ).toHaveLength(3);
    });
    // Third Test 
    it(' should have a logout button ' , ( ) => {
        // Setting Props To Our Shallow Component.
        wrapper.setProps({isAuth : true });
        expect( wrapper.contains( <NavigationItem link='/logout' >logout</NavigationItem> ) ).toBe(true);
    });

});