import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import ServicesSlider from "./ServicesSlider/ServicesSlider";
import Salons from "./Salons/Salons";
import Spotlights from "./Spotlights/Spotlights";
import Deals from "./Deals/Deals";

const Landing = props => {
    return (
        <div className="landing">
            <Header />
            <Hero />
            <ServicesSlider />
            <Salons />
            <Spotlights />
            <Deals />
        </div>
    );
}
export default Landing;