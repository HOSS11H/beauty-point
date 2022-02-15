import { useContext, useState } from 'react';
import { IconButton } from '@mui/material';
import ThemeContext from '../../../../store/theme-context';
import { Wrapper } from '../ModuleMood/ModuleMood';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import LocationSelector from '../../../../pages/Home/LocationSelector/LocationSelector';
import { useEffect } from 'react';


const ModuleLocation = props => {

    const themeCtx = useContext(ThemeContext);
    const { city, selectCity } = themeCtx;

    const [ locationSelectorOpened, setLocationSelectorOpened ] = useState(false)

    const openSelectCtyHandler = () => {
        setLocationSelectorOpened(true)
    }

    useEffect(() => {
        !city && setLocationSelectorOpened(true)
    }, [city])

    const selectLocationHandler = (city) => {
        selectCity(city)
        setLocationSelectorOpened(false)
    }

    return (
        <Wrapper>
            <IconButton onClick={openSelectCtyHandler} >
                <EditLocationAltIcon />
            </IconButton>
            <LocationSelector show={locationSelectorOpened} onConfirm={selectLocationHandler} />
        </Wrapper>
    )
}
export default ModuleLocation