import { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { connect } from 'react-redux';
import CustomCard from '../../../../../components/UI/Card/Card';
import Booking from '../../../../../components/UI/Dashboard/Booking/Booking';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchTotalBookings } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';
import AuthContext from '../../../../../store/auth-context';


const TotalBookings = props => {

    const themeCtx = useContext(ThemeContext)
    const authCtx = useContext(AuthContext)

    const { lang } = themeCtx
    const { token } = authCtx

    const { fetchedTotalBookings, fetchTotalBookingsHandler, loadingTotalBookings } = props;

    useEffect(() => {
        fetchTotalBookingsHandler( lang , token ) ;
    }, [ fetchTotalBookingsHandler, lang , token ]);

    let loadedTotalBookings ;
    
    if ( Object.keys(fetchedTotalBookings).length > 0 ) { 
        loadedTotalBookings = (
            <Grid container spacing={3}>
                <Grid item xs={6} md={4} >
                    <Booking icon={<EventIcon />} name='completed bookings' num={fetchedTotalBookings.completed} completed />
                </Grid>
                <Grid item xs={6} md={4} >
                    <Booking icon={<EventIcon />} name='pending bookings' num={fetchedTotalBookings.pending} pending />
                </Grid>
                <Grid item xs={6} md={4} >
                    <Booking icon={<EventIcon />} name='approved bookings' num={fetchedTotalBookings.approved} approved />
                </Grid>
                <Grid item xs={6} md={4} >
                    <Booking icon={<EventIcon />} name='in progress bookings' num={fetchedTotalBookings.in_progress} inProgress />
                </Grid>
                <Grid item xs={6} md={4} >
                    <Booking icon={<EventIcon />} name='canceled bookings' num={fetchedTotalBookings.canceled} canceled />
                </Grid>
                <Grid item xs={6} md={4} >
                    <Booking icon={<AttachMoneyIcon />} name='total earnings' num={fetchedTotalBookings.total} earnings />
                </Grid>
            </Grid>
        )
    }

    return ( 
        <CustomCard heading={`total bookings : `} total={ Object.keys(fetchedTotalBookings).length > 0 ? fetchedTotalBookings.total : 0 } loading={loadingTotalBookings}>
            { loadedTotalBookings }
        </CustomCard>
    )
}

const mapStateToProps = state => {
    return {
        fetchedTotalBookings: state.bookings.totalBookings,
        loadingTotalBookings: state.bookings.fetchingTotalBookings,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTotalBookingsHandler: ( language , token ) => dispatch( fetchTotalBookings( language , token ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalBookings);