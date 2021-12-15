import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import ServicesSlider from "./ServicesSlider/ServicesSlider";
import Salons from "./Salons/Salons";
import Spotlights from "./Spotlights/Spotlights";
import Deals from "./Deals/Deals";
import Footer from "./Footer/Footer";
import ModuleWhatsapp from './Header/Modules/ModuleWhatsapp/ModuleWhatsapp';

const Landing = props => {
    return (
        <div className="landing">
            <Header />
            <Hero />
            <ServicesSlider />
            <Salons />
            <Spotlights />
            <Deals />
            <Footer />
            <ModuleWhatsapp />
        </div>
    );
}
export default Landing;