import { useCallback, useState  } from "react";
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import styled from 'styled-components';

const Wrapper = styled.div`
`
const Main = styled.main`
    overflow-x: hidden;
`

const Layout = props => {
    
    const [ sideDrawerState , setSideDrawerState ] = useState( false );

    const sideDrawertoggleHandler = useCallback( ( ) => {
        setSideDrawerState( prevState => !prevState)
    }, [ ] )
    const sideDrawerCancelHandler = useCallback( ( ) => {
        setSideDrawerState( false )
    } , [ ] )

    return (
        <Main dir={props.dir}>
            <Toolbar sideDrawerToggle={sideDrawertoggleHandler}  />
            <SideDrawer opened={sideDrawerState} 
                event={sideDrawerCancelHandler} 
                authentication={props.isAuth} />
            <Wrapper>
                {props.children}
            </Wrapper>
        </Main>
    )
};


export default Layout;