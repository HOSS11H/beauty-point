import React, { Fragment, Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

import AuthContext from './store/auth-context';
import ThemeContext from './store/theme-context';

import { PermissibleRender } from '@brainhubeu/react-permissible';
import { connect } from 'react-redux';
import Layout from './components/Layout/Layout';
import Loader from './components/UI/Loader/Loader';
import { getNotificationToken } from './firebase';

const Users = React.lazy(() => import('./pages/Account/Content/Users/Users'));
const Collection = React.lazy(() => import('./pages/Account/Content/Collection/Collection'));
const Sources = React.lazy(() => import('./pages/Account/Content/Sources/Sources'));

const Auth = React.lazy(() => import('./pages/Auth/Auth'));
const RegisterArtist = React.lazy(() => import('./pages/RegisterArtist/RegisterArtist'));
const Account = React.lazy(() => import('./pages/Account/Account'));
const Dashboard = React.lazy(() =>
import('./pages/Account/Content/Dashboard/Dashboard')
);
const Services = React.lazy(() =>
import('./pages/Account/Content/Services/Services')
);
const Products = React.lazy(() =>
    import('./pages/Account/Content/Products/Products')
);
const Deals = React.lazy(() => import('./pages/Account/Content/Deals/Deals'));
const Bookings = React.lazy(() =>
import('./pages/Account/Content/Bookings/Bookings')
);
const Orders = React.lazy(() =>
import('./pages/Account/Content/Orders/Orders')
);
const Returns = React.lazy(() =>
import('./pages/Account/Content/Returns/Returns')
);
/* const PointOfSale = React.lazy(() =>
import('./pages/Account/Content/PointOfSale/PointOfSale')
); */
const POS = React.lazy(() =>
import('./pages/Account/Content/POS/POS')
);
const BookingCalendar = React.lazy(() =>
    import('./pages/Account/Content/BookingCalendar/BookingCalendar')
);
const Reports = React.lazy(() =>
    import('./pages/Account/Content/Reports/Reports')
);
const Employees = React.lazy(() =>
    import('./pages/Account/Content/Employees/Employees')
);
const Customers = React.lazy(() =>
    import('./pages/Account/Content/Customers/Customers')
);

const Expenses = React.lazy(() =>
    import('./pages/Account/Content/Expenses/Expenses')
);
const ExpenseCategories = React.lazy(() =>
    import('./pages/Account/Content/Expenses/ExpenseCategories/ExpenseCategories')
);
const ExpenseCustomers = React.lazy(() =>
    import('./pages/Account/Content/Expenses/ExpenseCustomers/ExpenseCustomers')
);
const ExpenseBanks = React.lazy(() =>
    import('./pages/Account/Content/Expenses/ExpenseBanks/ExpenseBanks')
);

const Units = React.lazy(() => import('./pages/Account/Content/Units/Units'));

const Coupons = React.lazy(() =>
    import('./pages/Account/Content/Coupons/Coupons')
);

const Tickets = React.lazy(() =>
    import('./pages/Account/Content/Tickets/Tickets')
);
const TicketsTable = React.lazy(() =>
    import('./pages/Account/Content/Tickets/TicketsTable/TicketsTable')
);

const SingleTicket = React.lazy(() =>
    import('./pages/Account/Content/Tickets/SingleTicket/SingleTicket')
);

const Seats = React.lazy(() =>
    import('./pages/Account/Content/Seats/Seats')
);
const SeatsTable = React.lazy(() =>
    import('./pages/Account/Content/Seats/SeatsTable/SeatsTable')
);

const SingleSeat = React.lazy(() =>
    import('./pages/Account/Content/Seats/SingleSeat/SingleSeat')
);

const SeatsRequests = React.lazy(() =>
    import('./pages/Account/Content/Seats/SeatsRequests/SeatsRequests')
);

const ArtistSeats = React.lazy(() =>
    import('./pages/Account/Content/ArtistSeats/ArtistSeats')
);
const Plans = React.lazy(() =>
    import('./pages/Account/Content/Plans/Plans')
);

const PaymentStatus = React.lazy(() =>
    import('./pages/Account/Content/Plans/PaymentStatus/PaymentStatus')
);

const Settings = React.lazy(() =>
    import('./pages/Account/Content/Settings/Settings')
);
const GeneralSettings = React.lazy(() =>
    import('./pages/Account/Content/Settings/GeneralSettings/GeneralSettings')
);
const VendorPage = React.lazy(() =>
    import('./pages/Account/Content/Settings/VendorPage/VendorPage')
);
const BookingSettings = React.lazy(() =>
    import('./pages/Account/Content/Settings/BookingSettings/BookingSettings')
);
const EmployeeSettings = React.lazy(() =>
    import('./pages/Account/Content/Settings/EmployeeSettings/EmployeeSettings')
);
const RolesPermissions = React.lazy(() =>
    import('./pages/Account/Content/Settings/RolesPermissions/RolesPermissions')
);
const Notifications = React.lazy(() => import('./pages/Account/Content/Notifications/Notifications'));
const AllNotifications = React.lazy(() => import('./pages/Account/Content/Notifications/AllNotifications/AllNotifications'));
const SingleNotification = React.lazy(() => import('./pages/Account/Content/Notifications/SingleNotification/SingleNotification'));

const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

const Home = React.lazy(() => import('./pages/Home/Home'));
const HomePage = React.lazy(() => import('./pages/Home/HomePage/HomePage'));
const SingleCategory = React.lazy(() =>
    import('./pages/Home/SingleCategory/SingleCategory')
);
const SingleService = React.lazy(() =>
    import('./pages/Home/SingleService/SingleService')
);
const AllDeals = React.lazy(() => import('./pages/Home/AllDeals/AllDeals'));
const SingleDeal = React.lazy(() =>
    import('./pages/Home/SingleDeal/SingleDeal')
);
const SingleSalon = React.lazy(() =>
    import('./pages/Home/SingleSalon/SingleSalon')
);
const SingleArtist = React.lazy(() =>
    import('./pages/Home/SingleArtist/SingleArtist')
);
const AllPackages = React.lazy(() =>
    import('./pages/Home/AllPackages/AllPackages')
);
const AllCategories = React.lazy(() =>
    import('./pages/Home/AllCategories/AllCategories')
);
const AllSaloons = React.lazy(() =>
    import('./pages/Home/AllSaloons/AllSaloons')
);
const AllArtists = React.lazy(() =>
    import('./pages/Home/AllArtists/AllArtists')
);
const NearbySalons = React.lazy(() =>
    import('./pages/Home/NearbySalons/NearbySalons')
);
const AllSpotlights = React.lazy(() =>
    import('./pages/Home/AllSpotlights/AllSpotlights')
);
const FAQs = React.lazy(() => import('./pages/Home/FAQs/FAQs'));
const AboutUs = React.lazy(() => import('./pages/Home/AboutUs/AboutUs'));

const Landing = React.lazy(() => import('./pages/Landing/Landing'));


function App(props) {

    const { fetchedPermissions } = props;

    const permissions = fetchedPermissions.map(permission => {
        return permission.name
    })

    const themeCtx = useContext(ThemeContext);

    const authCtx = useContext(AuthContext);

    const { roleName, isLoggedIn } = authCtx;

    getNotificationToken();

    let routes = (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/register-artist" element={<RegisterArtist />} />
            <Route path="/home/*" element={<Home />}>
                <Route index element={<HomePage />} />
                <Route path="all-categories" element={<AllCategories />} />
                <Route path="all-saloons" element={<AllSaloons />} />
                <Route path="all-deals" element={<AllDeals />} />
                <Route path="all-spotlights" element={<AllSpotlights />} />
                <Route path="all-artists" element={<AllArtists />} />
                <Route path="packages" element={<AllPackages />} />
                <Route path="faqs" element={<FAQs />} />.
                <Route path="about-us" element={<AboutUs />} />.
                <Route path="categories/:categoryId" element={<SingleCategory />} />
                <Route path="services/:serviceId" element={<SingleService />} />
                <Route path="deals/:dealId" element={<SingleDeal />} />
                <Route path="salons/:salonId" element={<SingleSalon />} />
                <Route path="artists/:artistId" element={<SingleArtist />} />
                <Route path="nearby-salons" element={<NearbySalons />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/account/*" element={<Account />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="orders/*" element={<Orders />} >
                        <Route index  element={<Bookings />} />
                        <Route path='returns'  element={<Returns />} />
                    </Route>
                    <Route path="booking-calendar" element={<BookingCalendar />} />
                    <Route path="products/*" element={<Collection />} >
                        <Route index element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_product']}
                                renderOtherwise={<NotFound />}
                            >
                                <Products />
                            </PermissibleRender>
                        } />
                        <Route path="services" element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_business_service']}
                                renderOtherwise={<NotFound />}
                            >
                                <Services />
                            </PermissibleRender>
                        } />
                        <Route path="units" element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_product']}
                                renderOtherwise={<NotFound />}
                            >
                                <Units />
                            </PermissibleRender>
                        } />
                        <Route path="deals" element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_deal']}
                                renderOtherwise={<NotFound />}
                            >
                                <Deals />
                            </PermissibleRender>
                        } />
                    </Route>
                    {/* <Route path="point-of-sale" element={
                        <PermissibleRender
                            userPermissions={permissions}
                            requiredPermissions={['create_booking']}
                            renderOtherwise={<NotFound />}
                        >
                            <PointOfSale />
                        </PermissibleRender>
                    } /> */}
                    <Route path="point-of-sale" element={
                        <PermissibleRender
                            userPermissions={permissions}
                            requiredPermissions={['create_booking']}
                            renderOtherwise={<NotFound />}
                        >
                            <POS />
                        </PermissibleRender>
                    } />
                    <Route path='users/*' element={<Users />} >
                        <Route index element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_customer']}
                                renderOtherwise={<NotFound />}
                            >
                                <Customers />
                            </PermissibleRender>
                        } />
                        <Route path='employees' element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_employee']}
                                renderOtherwise={<NotFound />}
                            >
                                <Employees />
                            </PermissibleRender>
                        } />
                        <Route path="agents" element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_report']}
                                renderOtherwise={<NotFound />}
                            >
                                <ExpenseCustomers />
                            </PermissibleRender>
                        } />
                    </Route>
                    <Route path="reports" element={
                        <PermissibleRender
                            userPermissions={permissions}
                            requiredPermissions={['read_report']}
                            renderOtherwise={<NotFound />}
                        >
                            <Reports />
                        </PermissibleRender>
                    } />
                    <Route path='sources' element={<Sources />} >
                        <Route path="settings/*" element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['manage_settings']}
                                renderOtherwise={<NotFound />}
                            >
                                <Settings />
                            </PermissibleRender>
                        }>
                            <Route index element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['manage_settings']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <GeneralSettings />
                                </PermissibleRender>
                            } />
                            <Route path="vendor-page" element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['manage_settings']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <VendorPage />
                                </PermissibleRender>
                            } />
                            <Route path="booking-settings" element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['manage_settings']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <BookingSettings />
                                </PermissibleRender>
                            } />
                            {roleName !== 'artist' && (
                                <Fragment>
                                    <Route path="employee-settings" element={
                                        <PermissibleRender
                                            userPermissions={permissions}
                                            requiredPermissions={['manage_settings']}
                                            renderOtherwise={<NotFound />}
                                        >
                                            <EmployeeSettings />
                                        </PermissibleRender>
                                    } />
                                    <Route path="roles-permissions" element={
                                        <PermissibleRender
                                            userPermissions={permissions}
                                            requiredPermissions={['manage_settings']}
                                            renderOtherwise={<NotFound />}
                                        >
                                            <RolesPermissions />
                                        </PermissibleRender>
                                    } />
                                </Fragment>
                            )}
                        </Route>
                        <Route path="coupons" element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['read_coupon']}
                                renderOtherwise={<NotFound />}
                            >
                                <Coupons />
                            </PermissibleRender>
                        } />
                        <Route path="tickets/*" element={
                            <PermissibleRender
                                userPermissions={permissions}
                                requiredPermissions={['manage_settings']}
                                renderOtherwise={<NotFound />}
                            >
                                <Tickets />
                            </PermissibleRender>
                        } >
                            <Route index element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['manage_settings']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <TicketsTable />
                                </PermissibleRender>
                            } />
                            <Route path=':id' element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['manage_settings']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <SingleTicket />
                                </PermissibleRender>
                            } />
                        </ Route>
                        {roleName !== 'artist' && (
                            <Route path="seats/*" element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['manage_settings']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <Seats />
                                </PermissibleRender>
                            } >
                                <Route index element={
                                    <PermissibleRender
                                        userPermissions={permissions}
                                        requiredPermissions={['manage_settings']}
                                        renderOtherwise={<NotFound />}
                                    >
                                        <SeatsTable />
                                    </PermissibleRender>
                                } />
                                <Route path=':id' element={
                                    <PermissibleRender
                                        userPermissions={permissions}
                                        requiredPermissions={['manage_settings']}
                                        renderOtherwise={<NotFound />}
                                    >
                                        <SingleSeat />
                                    </PermissibleRender>
                                } />
                                <Route path='requests' element={
                                    <PermissibleRender
                                        userPermissions={permissions}
                                        requiredPermissions={['manage_settings']}
                                        renderOtherwise={<NotFound />}
                                    >
                                        <SeatsRequests />
                                    </PermissibleRender>
                                } />
                            </ Route>
                        )}
                        {roleName === 'artist' && (
                            <Route path='artist-seats' element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['manage_settings']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <ArtistSeats />
                                </PermissibleRender>
                            } />
                        )}
                        <Route path="plans/*" element={
                            <Routes>
                                <Route index element={
                                    <PermissibleRender
                                        userPermissions={permissions}
                                        requiredPermissions={['manage_settings']}
                                        renderOtherwise={<NotFound />}
                                    >
                                        <Plans />
                                    </PermissibleRender>
                                } />
                                <Route path="status" element={
                                    <PermissibleRender
                                        userPermissions={permissions}
                                        requiredPermissions={['manage_settings']}
                                        renderOtherwise={<NotFound />}
                                    >
                                        <PaymentStatus />
                                    </PermissibleRender>
                                } />
                            </Routes>
                        }
                        />
                        <Route path="notifications/*" element={<Notifications />} >
                            <Route index element={<AllNotifications />} />
                            <Route path=':id' element={<SingleNotification />} />
                        </Route>
                    </Route>
                    {roleName !== 'artist' && (
                        <Fragment>
                            <Route path="expenses" element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['read_report']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <Expenses />
                                </PermissibleRender>
                            } />
                            <Route path="expenses/categories" element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['read_report']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <ExpenseCategories />
                                </PermissibleRender>
                            } />
                            <Route path="expenses/banks" element={
                                <PermissibleRender
                                    userPermissions={permissions}
                                    requiredPermissions={['read_report']}
                                    renderOtherwise={<NotFound />}
                                >
                                    <ExpenseBanks />
                                </PermissibleRender>
                            } />
                        </Fragment>
                    )}
                </Route>
                <Route path="/home/*" element={<Home />}>
                    <Route index element={<HomePage />} />
                    <Route path="all-categories" element={<AllCategories />} />
                    <Route path="all-saloons" element={<AllSaloons />} />
                    <Route path="all-artists" element={<AllArtists />} />
                    <Route path="all-deals" element={<AllDeals />} />
                    <Route path="all-spotlights" element={<AllSpotlights />} />
                    <Route path="packages" element={<AllPackages />} />
                    <Route path="faqs" element={<FAQs />} />.
                    <Route path="about-us" element={<AboutUs />} />.
                    <Route path="categories/:categoryId" element={<SingleCategory />} />
                    <Route path="services/:serviceId" element={<SingleService />} />
                    <Route path="deals/:dealId" element={<SingleDeal />} />
                    <Route path="salons/:salonId" element={<SingleSalon />} />
                    <Route path="artists/:artistId" element={<SingleArtist />} />
                    <Route path="nearby-salons" element={<NearbySalons />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        );
    }

    return (
        <StyleSheetManager
            stylisPlugins={themeCtx.direction === 'rtl' && [rtlPlugin]}
        >
            <Layout dir={themeCtx.direction}>
                <Suspense fallback={<Loader height="100vh" />}>{routes}</Suspense>
            </Layout>
        </StyleSheetManager>
    );
}

const mapStateToProps = (state) => {
    return {
        fetchedPermissions: state.permissions.permissions,
    };
};

export default connect(mapStateToProps, null)(App);
