import { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { connect } from 'react-redux';
import CustomCard from '../../../../../components/UI/Card/Card';
import Booking from '../../../../../components/UI/Dashboard/Booking/Booking';
import EventIcon from '@mui/icons-material/Event';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { fetchTotalBookings } from '../../../../../store/actions/index';
import ThemeContext from '../../../../../store/theme-context';


const TotalBookings = props => {

    const themeCtx = useContext(ThemeContext)

    const { lang } = themeCtx

    const { fetchedTotalBookings, fetchTotalBookingsHandler } = props;

    useEffect(() => {
        fetchTotalBookingsHandler( lang ) ;
    }, [fetchTotalBookingsHandler, lang]);

    return ( 
        <CustomCard heading={`total bookings : `} total='26' loading={false}>
            <Grid container spacing={3}>
                <Grid item sm={6} md={4} >
                    <Booking icon={<EventIcon />} name='completed bookings' num='10' completed />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<EventIcon />} name='pending bookings' num='10' pending />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<EventIcon />} name='approved bookings' num='10' approved />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<EventIcon />} name='in progress bookings' num='10' inProgress />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<EventIcon />} name='canceled bookings' num='10' canceled />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<AccountBalanceIcon />} name='walk in bookings' num='10' walkIn />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<PhonelinkIcon />} name='online bookings' num='10' online />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<PeopleAltIcon />} name='total customers' num='10' customers />
                </Grid>
                <Grid item sm={6} md={4} >
                    <Booking icon={<AttachMoneyIcon />} name='total earnings' num='10' earnings />
                </Grid>
            </Grid>
        </CustomCard>
    )
}

const mapStateToProps = state => {
    return {
        fetchedTotalBookings: state.bookings.totalBookings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTotalBookingsHandler: ( language ) => dispatch( fetchTotalBookings( language ) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalBookings);