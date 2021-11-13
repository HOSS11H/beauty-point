import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import { Route, Routes } from 'react-router-dom'

import ThemeContext from './store/theme-context';

import Layout from './components/Layout/Layout';
import Auth from './pages/Auth/Auth';
import NotFound from './pages/NotFound/NotFound';
import Landing from './pages/Landing/Landing';
import Account from './pages/Account/Account';
import Dashboard from './pages/Account/Content/Dashboard/Dashboard';
import Services from './pages/Account/Content/Services/Services';
import { useContext } from "react";



function App() {

    const themeCtx = useContext(ThemeContext)

    const routes = (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/account/*" element={<Account />} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="services" element={<Services />} />
            </ Route>
            <Route path="/" element={<Landing />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )

    return (
        <StyleSheetManager stylisPlugins={themeCtx.direction === 'rtl' && [rtlPlugin]}>
            <Layout dir={themeCtx.direction}>
                {routes}
            </Layout>
        </StyleSheetManager>
    );
}

export default App;
