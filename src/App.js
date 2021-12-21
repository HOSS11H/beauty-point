import { useContext } from "react";
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import { Route, Routes } from 'react-router-dom'

import ThemeContext from './store/theme-context';
import AuthContext from './store/auth-context';

import Layout from './components/Layout/Layout';
import Auth from './pages/Auth/Auth';
import NotFound from './pages/NotFound/NotFound';
import Landing from './pages/Landing/Landing';
import AllCategories from "./pages/AllCategories/AllCategories";
import Saloons from "./pages/AllSaloons/Saloons";
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
import Expenses from "./pages/Account/Content/Expenses/Expenses";
import ExpenseCategories from "./pages/Account/Content/Expenses/ExpenseCategories/ExpenseCategories";
import ExpenseCustomers from "./pages/Account/Content/Expenses/ExpenseCustomers/ExpenseCustomers";


import Settings from "./pages/Account/Content/Settings/Settings";
import GeneralSettings from './pages/Account/Content/Settings/GeneralSettings/GeneralSettings'
import VendorPage from './pages/Account/Content/Settings/VendorPage/VendorPage'
import BookingSettings from "./pages/Account/Content/Settings/BookingSettings/BookingSettings";
import EmployeeSettings from "./pages/Account/Content/Settings/EmployeeSettings/EmployeeSettings";

function App() {

    const themeCtx = useContext(ThemeContext)

    const authCtx = useContext(AuthContext);

    const { isLoggedIn } = authCtx;


    let routes = (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Landing />} />
            <Route path="/all-categories" element={<AllCategories />} />
            <Route path='*' element={<Landing />} />
        </Routes>
    )
    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/account/*" element={<Account />} >
                    <Route path="services" element={<Services />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route path="expenses/categories" element={<ExpenseCategories />} />
                    <Route path="expenses/customers" element={<ExpenseCustomers />} />
                    <Route path="deals" element={<Deals />} />
                    <Route path='point-of-sale' element={<PointOfSale />} />
                    <Route path='bookings' element={<Bookings />} />
                    <Route path='booking-calendar' element={<BookingCalendar />} />
                    <Route path='reports' element={<Reports />} />
                    <Route path='employees' element={<Employees />} />
                    <Route path="settings/*" element={<Settings />}>
                        <Route path='' element={<GeneralSettings />} />
                        <Route path='vendor-page' element={<VendorPage />} />
                        <Route path="booking-settings" element={<BookingSettings />} />
                        <Route path="employee-settings" element={<EmployeeSettings />} />
                    </Route>
                </ Route>
                <Route path="/" element={<Landing />} />
                <Route path="/all-categories" element={<AllCategories />} />
                <Route path="/all-saloons" element={<Saloons/>} />
                <Route path='*' element={<Landing />} />
            </Routes>
        )
    }

    return (
        <StyleSheetManager stylisPlugins={themeCtx.direction === 'rtl' && [rtlPlugin]}>
            <Layout dir={themeCtx.direction}>
                {routes}
            </Layout>
        </StyleSheetManager>
    );
}

export default App;
