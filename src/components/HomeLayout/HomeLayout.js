import pageTitleImage from '../../assets/images/hero/1.jpg';
import Header from '../Header/Header';
import MobileBar from '../Header/MobileBar/MobileBar';
import Footer from '../Footer/Footer';
import PageTitle from '../PageTitle/PageTitle';
import { Fragment } from 'react';
import ModuleWhatsapp from '../Header/Modules/ModuleWhatsapp/ModuleWhatsapp';

const HomeLayout = props => {
    return (
        <Fragment>
            <Header />
            <MobileBar />
            <PageTitle imgSrc={pageTitleImage}  />
            { props.children }
            <Footer />
            <ModuleWhatsapp />
        </Fragment>
    )
};


export default HomeLayout;