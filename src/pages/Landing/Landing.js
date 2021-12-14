import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import ServicesSlider from "./ServicesSlider/ServicesSlider";
import Salons from "./Salons/Salons";

const Landing = props => {
    return (
        <div className="landing">
            <Header />
            <Hero />
            <ServicesSlider />
            <Salons />
        </div>
    );
}
export default Landing;