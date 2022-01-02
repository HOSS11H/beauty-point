import pageTitleImage from '../../assets/images/hero/1.jpg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PageTitle from '../PageTitle/PageTitle';
import { Fragment } from 'react';
import ModuleWhatsapp from '../Header/Modules/ModuleWhatsapp/ModuleWhatsapp';

const HomeLayout = props => {
    return (
        <Fragment>
            <Header />
            <PageTitle imgSrc={pageTitleImage}  />
            { props.children }
            <Footer />
            <ModuleWhatsapp />
        </Fragment>
    )
};


export default HomeLayout;