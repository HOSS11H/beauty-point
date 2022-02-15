import { useContext } from "react";
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import { Route, Routes } from 'react-router-dom'

import ThemeContext from './store/theme-context';
import AuthContext from './store/auth-context';

import Layout from './components/Layout/Layout';
import Auth from './pages/Auth/Auth';
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

import Units from "./pages/Account/Content/Units/Units";
import Settings from "./pages/Account/Content/Settings/Settings";
import GeneralSettings from './pages/Account/Content/Settings/GeneralSettings/GeneralSettings'
import VendorPage from './pages/Account/Content/Settings/VendorPage/VendorPage'
import BookingSettings from "./pages/Account/Content/Settings/BookingSettings/BookingSettings";
import EmployeeSettings from "./pages/Account/Content/Settings/EmployeeSettings/EmployeeSettings";
import RolesPermissions from "./pages/Account/Content/Settings/RolesPermissions/RolesPermissions";

import NotFound from './pages/NotFound/NotFound';

import Home from "./pages/Home/Home";
import HomePage from "./pages/Home/HomePage/HomePage";
import SingleCategory from "./pages/Home/SignleCategory/SignleCategory";
import SingleService from "./pages/Home/SingleService/SingleService";
import AllDeals from "./pages/Home/AllDeals/AllDeals";
import AllSpotlights from "./pages/Home/AllSpotlights/AllSpotlights";

import SingleDeal from "./pages/Home/SingleDeal/SingleDeal";
import SingleSalon from "./pages/Home/SingleSalon/SingleSalon";
import AllPackages from "./pages/Home/AllPackages/AllPackages";
import AllCategories from "./pages/Home/AllCategories/AllCategories";
import AllSaloons from "./pages/Home/AllSaloons/AllSaloons";
import NearbySalons from "./pages/Home/NearbySalons/NearbySalons";

import Landing from "./pages/Landing/Landing";
import Customers from "./pages/Account/Content/Customers/Customers";
import ExpenseBanks from "./pages/Account/Content/Expenses/ExpenseBanks/ExpenseBanks";
import FAQs from "./pages/Home/FAQs/FAQs";
import AboutUs from "./pages/Home/AboutUs/AboutUs";

function App() {

    const themeCtx = useContext(ThemeContext)

    const authCtx = useContext(AuthContext);

    const { isLoggedIn } = authCtx;



    let routes = (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home/*" element={<Home />} >
                <Route index element={<HomePage />} />
                <Route path="all-categories" element={<AllCategories />} />
                <Route path="all-saloons" element={<AllSaloons />} />
                <Route path="all-deals" element={<AllDeals />} />
                <Route path="all-spotlights" element={<AllSpotlights />} />
                <Route path="packages" element={<AllPackages />} />
                <Route path="categories/:categoryId" element={<SingleCategory />} />
                <Route path="services/:serviceId" element={<SingleService />} />
                <Route path="deals/:dealId" element={<SingleDeal />} />
                <Route path="salons/:salonId" element={<SingleSalon />} />
                <Route path="nearby-salons" element={<NearbySalons />} />
                <Route path='*' element={<NotFound />} />
            </Route>
            <Route path='/' element={<Landing />} />
            <Route path='*' element={<NotFound />} />
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
                    <Route path="expenses/banks" element={<ExpenseBanks />} />
                    <Route path="units" element={<Units />} />
                    <Route path="deals" element={<Deals />} />
                    <Route path='point-of-sale' element={<PointOfSale />} />
                    <Route path='bookings' element={<Bookings />} />
                    <Route path='booking-calendar' element={<BookingCalendar />} />
                    <Route path='reports' element={<Reports />} />
                    <Route path='employees' element={<Employees />} />
                    <Route path='customers' element={<Customers />} />
                    <Route path="settings/*" element={<Settings />}>
                        <Route index element={<GeneralSettings />} />
                        <Route path='vendor-page' element={<VendorPage />} />
                        <Route path="booking-settings" element={<BookingSettings />} />
                        <Route path="employee-settings" element={<EmployeeSettings />} />
                        <Route path="roles-permissions" element={<RolesPermissions />} />
                    </Route>
                </ Route>
                <Route path="/home/*" element={<Home />} >
                    <Route index element={<HomePage />} />
                    <Route path="all-categories" element={<AllCategories />} />
                    <Route path="all-saloons" element={<AllSaloons />} />
                    <Route path="all-deals" element={<AllDeals />} />
                    <Route path="all-spotlights" element={<AllSpotlights />} />
                    <Route path="packages" element={<AllPackages />} />
                    <Route path="faqs" element={<FAQs />} />.
                    <Route path="about-us" element={<AboutUs />} />.
                    <Route path="categories/:categoryId" element={<SingleCategory />} />
                    <Route path="services/:serviceId" element={<SingleService />} />
                    <Route path="deals/:dealId" element={<SingleDeal />} />
                    <Route path="salons/:salonId" element={<SingleSalon />} />
                    <Route path="nearby-salons" element={<NearbySalons />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
                <Route path='/' element={<Landing />} />
                <Route path='*' element={<NotFound />} />
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
