import { useState, useEffect, useCallback, useContext, Fragment } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../../store/theme-context'

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import ValidationMessage from '../../../../../../components/UI/ValidationMessage/ValidationMessage';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from '../../../../../../utils/axios-instance';


const CustomTextField = styled(TextField)`
    width: 100%;
`
const CustomWrapper = styled.div`
    display: flex;
    align-items: center;
`

const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedUnits } = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const selectedUnitIndex = fetchedUnits.data.findIndex(unit => unit.id === id);

    let unitData = fetchedUnits.data[selectedUnitIndex];

    const { name, type: unitType, unit_quantity, parent_id } = unitData;

    const [unitName, setUnitName] = useState(name);
    const [unitNameError, setUnitNameError] = useState(false);

    const [type, setType] = useState(unitType);

    const [unitQuantity, setProductQuantity] = useState(unit_quantity);
    const [unitQuantityError, setProductQuantityError] = useState(false);
    
    
    const [ allUnits, setAllUnits ] = useState([]);
    
    const [parentUnit, setParentUnit] = useState('');
    const [parentUnitError, setParentUnitError] = useState(false);

    const unitNameChangeHandler = (event) => {
        setUnitName(event.target.value);
        setUnitNameError(false);
    }

    const unitTypeChangeHandler = (event) => {
        setType(event.target.value);
    };

    const unitQuantityChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setProductQuantity(event.target.value);
            setProductQuantityError(false);
        }
    }
    const parentUnitChangeHandler = (event) => {
        setParentUnit(event.target.value);
        setParentUnitError(false);
    }

    useEffect(() => {
        if ( type === 'sub' ) {
            axios.get('/vendors/units')
                .then(res => {
                    setAllUnits(res.data.data);
                    setParentUnit(res.data.data.find( item => item.id === parent_id));
                })
        }
    }, [parent_id, type])

    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const confirmCreateHandler = useCallback(() => {
        if (unitName.trim().length === 0) {
            setUnitNameError(true);
            return;
        }
        if ( type === 'sub' && !parentUnit ) {
            setParentUnitError(true);
            return;
        }
        if (+unitQuantity === 0) {
            setProductQuantityError(true);
            return;
        }
        let data;
        if ( type === 'main' ) {
            data = {
                id: id,
                name: unitName,
                type: type,
                unit_quantity: unitQuantity,
                parent_id: null,
            }
        }
        if ( type === 'sub' ) {
            data = {
                id: id,
                name: unitName,
                type: type,
                unit_quantity: unitQuantity,
                parent_id: parentUnit.id,
            }
        }
        onConfirm(data);
    }, [unitName, type, parentUnit, unitQuantity, onConfirm, id])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="unit-name" label={t('name')} variant="outlined" value={unitName} onChange={unitNameChangeHandler} />
                {unitNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%', textAlign: 'left' }} component="fieldset">
                    <FormLabel component="legend">{t('unit type')}</FormLabel>
                    <RadioGroup row aria-label="type" name="row-radio-buttons-group" value={type} onChange={unitTypeChangeHandler} >
                        <FormControlLabel value="main" control={<Radio />} label={t('main')} />
                        <FormControlLabel value="sub" control={<Radio />} label={t('sub')} />
                    </RadioGroup>
                </FormControl>
            </Grid>
            {
                type === 'main' && (
                    <Grid item xs={12} sm={6}>
                        <CustomTextField id="unit-quantity" type='number' label={t('quantity')} variant="outlined" value={unitQuantity} onChange={unitQuantityChangeHandler} />
                        {unitQuantityError && <ValidationMessage notExist>{t(`Please add Quantity`)}</ValidationMessage>}
                    </Grid>
                )
            }
            {
                type === 'sub' && (
                    <Fragment>
                        <Grid item xs={12} sm={6}>
                            <FormControl sx={{ width: '100%' }}>
                                <Select
                                    value={parentUnit}
                                    onChange={parentUnitChangeHandler}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    {
                                        allUnits.map(unit => {
                                            return (
                                                <MenuItem key={unit.id} value={unit}>{unit.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            {parentUnitError && <ValidationMessage notExist>{t(`Please add parent unit`)}</ValidationMessage>}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomWrapper>
                                <Typography sx={ { display: 'inline-flex', marginRight: '5px' } } variant="h6">=</Typography>
                                <CustomTextField id="unit-quantity" type='number' label={t('quantity')}
                                    variant="outlined" value={unitQuantity} onChange={unitQuantityChangeHandler}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">{(parentUnit?.name)} </InputAdornment>,
                                    }}
                                />
                            </CustomWrapper>
                            {unitQuantityError && <ValidationMessage notExist>{t(`Please add Quantity`)}</ValidationMessage>}
                        </Grid>
                    </Fragment>
                )
            }
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}


export default CreateModal;