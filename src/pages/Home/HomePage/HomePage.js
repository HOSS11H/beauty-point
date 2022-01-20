import Header from "../../../components/Header/Header";
import Hero from "./Hero/Hero";
import CategoriesSlider from "./CategoriesSlider/CategoriesSlider";
import Salons from "./Salons/Salons";
import Spotlights from "./Spotlights/Spotlights";
import Deals from "./Deals/Deals";
import Footer from "../../../components/Footer/Footer";
import ModuleWhatsapp from '../../../components/Header/Modules/ModuleWhatsapp/ModuleWhatsapp';

const HomePage = props => {
    return (
        <div className="landing">
            <Header />
            <Hero />
            <CategoriesSlider />
            <Salons />
            <Spotlights />
            <Deals />
            <Footer />
            <ModuleWhatsapp />
        </div>
    );
}
export default HomePage;