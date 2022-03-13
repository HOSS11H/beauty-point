import React, { useContext, Suspense } from "react";
import { StyleSheetManager } from "styled-components";
import rtlPlugin from "stylis-plugin-rtl";
import { Route, Routes } from 'react-router-dom'

import ThemeContext from './store/theme-context';
import AuthContext from './store/auth-context';

import Layout from './components/Layout/Layout';
import Loader from "./components/UI/Loader/Loader";
import { connect } from "react-redux";
import { PermissibleRender } from '@brainhubeu/react-permissible';


const Auth = React.lazy(() => import('./pages/Auth/Auth'));
const Account = React.lazy(() => import('./pages/Account/Account'));
const Dashboard = React.lazy(() => import('./pages/Account/Content/Dashboard/Dashboard'));
const Services = React.lazy(() => import('./pages/Account/Content/Services/Services'));
const Products = React.lazy(() => import('./pages/Account/Content/Products/Products'));
const Deals = React.lazy(() => import('./pages/Account/Content/Deals/Deals'));
const Bookings = React.lazy(() => import('./pages/Account/Content/Bookings/Bookings'));
const PointOfSale = React.lazy(() => import('./pages/Account/Content/PointOfSale/PointOfSale'));
const BookingCalendar = React.lazy(() => import('./pages/Account/Content/BookingCalendar/BookingCalendar'));
const Reports = React.lazy(() => import('./pages/Account/Content/Reports/Reports'));
const Employees = React.lazy(() => import('./pages/Account/Content/Employees/Employees'));
const Customers = React.lazy(() => import('./pages/Account/Content/Customers/Customers'));

const Expenses = React.lazy(() => import('./pages/Account/Content/Expenses/Expenses'));
const ExpenseCategories = React.lazy(() => import('./pages/Account/Content/Expenses/ExpenseCategories/ExpenseCategories'));
const ExpenseCustomers = React.lazy(() => import('./pages/Account/Content/Expenses/ExpenseCustomers/ExpenseCustomers'));
const ExpenseBanks = React.lazy(() => import('./pages/Account/Content/Expenses/ExpenseBanks/ExpenseBanks'));

const Units = React.lazy(() => import('./pages/Account/Content/Units/Units'));

const Settings = React.lazy(() => import('./pages/Account/Content/Settings/Settings'));
const GeneralSettings = React.lazy(() => import('./pages/Account/Content/Settings/GeneralSettings/GeneralSettings'));
const VendorPage = React.lazy(() => import('./pages/Account/Content/Settings/VendorPage/VendorPage'));
const BookingSettings = React.lazy(() => import('./pages/Account/Content/Settings/BookingSettings/BookingSettings'));
const EmployeeSettings = React.lazy(() => import('./pages/Account/Content/Settings/EmployeeSettings/EmployeeSettings'));
const RolesPermissions = React.lazy(() => import('./pages/Account/Content/Settings/RolesPermissions/RolesPermissions'));

const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

const Home = React.lazy(() => import('./pages/Home/Home'));
const HomePage = React.lazy(() => import('./pages/Home/HomePage/HomePage'));
const SingleCategory = React.lazy(() => import('./pages/Home/SingleCategory/SingleCategory'));
const SingleService = React.lazy(() => import('./pages/Home/SingleService/SingleService'));
const AllDeals = React.lazy(() => import('./pages/Home/AllDeals/AllDeals'))
const SingleDeal = React.lazy(() => import('./pages/Home/SingleDeal/SingleDeal'));
const SingleSalon = React.lazy(() => import('./pages/Home/SingleSalon/SingleSalon'));
const AllPackages = React.lazy(() => import('./pages/Home/AllPackages/AllPackages'));
const AllCategories = React.lazy(() => import('./pages/Home/AllCategories/AllCategories'));
const AllSaloons = React.lazy(() => import('./pages/Home/AllSaloons/AllSaloons'));
const NearbySalons = React.lazy(() => import('./pages/Home/NearbySalons/NearbySalons'));
const AllSpotlights = React.lazy(() => import('./pages/Home/AllSpotlights/AllSpotlights'));
const FAQs = React.lazy(() => import('./pages/Home/FAQs/FAQs'));
const AboutUs = React.lazy(() => import('./pages/Home/AboutUs/AboutUs'));

const Landing = React.lazy(() => import('./pages/Landing/Landing'));

function App(props) {

    const { fetchedPermissions } = props;

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
    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/account/*" element={<Account />} >
                    <Route path="services" element={
                        <PermissibleRender
                            //userPermissions={permissions}
                            //requiredPermissions={requiredPermissions}
                        >
                            <Services />
                        </PermissibleRender>
                    } />
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
                <Suspense fallback={
                    <Loader height='100vh' />
                }>
                    {routes}
                </Suspense>
            </Layout>
        </StyleSheetManager>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchedPermissions: state.permissions.permissions,
    }
}

export default connect(mapStateToProps, null)(App);
