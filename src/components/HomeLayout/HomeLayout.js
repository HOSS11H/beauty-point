import pageTitleImage from '../../assets/images/hero/1.jpg';
import Header from '../Header/Header';
import MobileBar from '../Header/MobileBar/MobileBar';
import Footer from '../Footer/Footer';
import PageTitle from '../PageTitle/PageTitle';
import { Fragment } from 'react';
import ModuleChat from '../Header/Modules/ModuleChat/ModuleChat';

const HomeLayout = props => {

    const { mainPage } = props;

    return (
        <Fragment>
            <Header />
            <MobileBar />
            {!mainPage &&  <PageTitle imgSrc={pageTitleImage}  />}
            { props.children }
            <Footer />
            <ModuleChat />
        </Fragment>
    )
};


export default HomeLayout;