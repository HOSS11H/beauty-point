import HomeLayout from "../../../components/HomeLayout/HomeLayout";
import Artists from "./Artists/Artists";
import CategoriesSlider from "./CategoriesSlider/CategoriesSlider";
import Deals from "./Deals/Deals";
import Hero from "./Hero/Hero";
import Salons from "./Salons/Salons";
import Spotlights from "./Spotlights/Spotlights";

const HomePage = props => {
    return (
        <div className="landing">
            <HomeLayout mainPage={true}>
                <Hero />
                <CategoriesSlider />
                <Salons />
                <Artists />
                <Spotlights />
                <Deals />
            </HomeLayout>
        </div>
    );
}
export default HomePage;