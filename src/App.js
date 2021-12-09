import { useContext } from "react";
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
import Products from './pages/Account/Content/Products/Products';
import Deals from './pages/Account/Content/Deals/Deals';
import Bookings from './pages/Account/Content/Bookings/Bookings'
import PointOfSale from "./pages/Account/Content/PointOfSale/PointOfSale";
import BookingCalendar from './pages/Account/Content/BookingCalendar/BookingCalendar';
import Reports from './pages/Account/Content/Reports/Reports';
import Employees from './pages/Account/Content/Employees/Employees';


import General from './pages/Account/Content/Settings/General'
import VendorPage from './pages/Account/Content/Settings/VendorPage'
import Settings from "./pages/Account/Content/Settings/Settings";

function App() {

    const themeCtx = useContext(ThemeContext)

    const routes = (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/account/*" element={<Account />} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="services" element={<Services />} />
                <Route path="products" element={<Products />} />
                <Route path="deals" element={<Deals />} />
                <Route path='point-of-sale' element={ <PointOfSale/> } />
                <Route path='bookings' element={ <Bookings/> } />
                <Route path='booking-calendar' element={ <BookingCalendar/> } />
                <Route path='reports' element={ <Reports/> } />
                <Route path='employees' element={<Employees />} />
                <Route path="settings/*" element={<Settings />}>
                    <Route path='' element={<General />} />
                    <Route path='vendor-page' element={<VendorPage />} />
                </Route>
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
