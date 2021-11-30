import ThemeContext from '../../../../../../store/theme-context'
import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

import ImageUploading from 'react-images-uploading';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../../../../../store/actions/index';
import { width } from 'dom-helpers';


const CustomTextField = styled(TextField)`
    width: 100%;
`
const CustomFormGroup = styled.div`
    display: flex;
    align-items: center;
`

const PriceCalculation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    p {
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
    }
`
const UploadImageTopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const UploadImageBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    max-width: 100%;
    width: 100%;
    img {
        width: 100%;
        height: 150px;
        object-fit: contain;
        max-width: 100%;
    }
`
const ImageItemBottomBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
`
const EditorWrapper = styled.div`
    .rdw-editor-wrapper {
        border-radius: 20px;
        border: 1px solid;
        border-color: ${({ theme }) => theme.palette.divider};
        margin-bottom: 20px;
    }
    .rdw-editor-toolbar {
        border: 0;
        border-bottom: 1px solid;
        border-color: ${({ theme }) => theme.palette.divider};
        border-radius: 20px 20px 0 0;
        padding: 20px;
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
    .rdw-editor-main {
        padding: 0 20px 20px;
    }
    .rdw-dropdown-carettoopen {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
    }
    .rdw-dropdown-carettoclose {
        position: relative;
        top: auto;
        right: auto;
        left: auto;
    }
    .rdw-dropdown-selectedtext {
        color: ${ ( { theme } ) => theme.palette.common.black };
        justify-content: space-between;
    }
    .rdw-dropdown-optionwrapper {
        color: ${ ( { theme } ) => theme.palette.common.black };
    }
    .rdw-embedded-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 50%;
        transform: translateX(-50%);
    }
    .rdw-image-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 50%;
        transform: translateX(-50%);
    }
    .rdw-emoji-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 50%;
        transform: translateX(-50%);
    }
    .rdw-link-modal {
        background-color: ${({ theme }) => theme.palette.background.default};
        left: 0%;
    }
`



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

function getStyles(employee, employeeName, theme) {
    const selectedIndex = employeeName.findIndex( name => name.id === employee.id);
    return {
        fontWeight:
            selectedIndex === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const EditModal = (props) => {
    
    const { show, heading, confirmText, onConfirm, onClose, id, fetchedServices, fetchedEmployees, fetchEmployeesHandler } = props;
    const { t } = useTranslation();
    const themeCtx = useContext(ThemeContext)
    const {lang} = themeCtx;

    const selectedServiceIndex = fetchedServices.data.findIndex(service => service.id === id);

    let serviceData = fetchedServices.data[selectedServiceIndex];

    const { name, description, price, discount, discount_type, price_after_discount, users = [{
        "id": 3,
        "name": "Malik Griffith",
        "email": "malik@example.com",
        "mobile": "1111",
        "calling_code": null
    },] , status, images, image } = serviceData;

    
    const [serviceName, setServiceName] = useState(name);
    
    const html = description;
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))

    const [servicePrice, setServicePrice] = useState(price);

    const [serviceDiscount, setServiceDiscount] = useState(discount);

    const [discountType, setDiscountType] = useState(discount_type);

    const [priceAfterDiscount, setPriceAfterDiscount] = useState(price_after_discount);

    const [employeeName, setEmployeeName] = useState(users);

    const [serviceStatus, setServiceStatus] = useState(status);

    const [ uploadedImages, setUploadedImages] = useState(images);

    const [defaultImage, setDefaultImage] = useState(image);
    
    const maxNumber = 69;

    useEffect(() => {
        let netPrice;
        if (discountType === 'percent') {
            netPrice = (servicePrice - (servicePrice * (serviceDiscount / 100))).toFixed(2);
            setPriceAfterDiscount(netPrice)
        } else if (discountType === 'fixed') {
            netPrice = (servicePrice - serviceDiscount).toFixed(2);
            setPriceAfterDiscount(netPrice)
        }
    }, [discountType, serviceDiscount, servicePrice])
    
    useEffect(() => {
        fetchEmployeesHandler(lang);
    }, [fetchEmployeesHandler, lang])


    const serviceNameChangeHandler = (event) => {
        setServiceName(event.target.value);
    }
    
    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        // data for submit
        setUploadedImages(imageList);
    };
    const defaultImageHandler = (event) => {
        setDefaultImage(event.target.value);
    };

    const onEditorChange = newState => {
        setEditorState(newState)
        console.log(newState)
    }

    const servicePriceChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setServicePrice(event.target.value);
        }
    }
    const serviceDiscountChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setServiceDiscount(event.target.value);
        }
    }
    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }
    const serviceStatusChangeHandler = (event) => {
        setServiceStatus(event.target.value);
    }

    const handleEmployeesChange = (event) => {
        const {
            target: { value },
        } = event;
        setEmployeeName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const closeModalHandler = useCallback(() => {
        onClose();
        setServiceName('');
        setServicePrice('')
        setDiscountType('percent')
        setPriceAfterDiscount('')
    }, [onClose])

    const confirmEditHandler = useCallback(() => {

        let employeesIds = [ ];
        employeeName.map(employee => {
            employeesIds.push(employee.id)
            return employeesIds;
        })

        const data = {
            id: id,
            name: serviceName,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            price: servicePrice,
            discount: serviceDiscount,
            discount_type: discountType,
            time: serviceData.time,
            time_type: serviceData.time_type,
            category_id: serviceData.category.id,
            location_id: serviceData.location.id,
            employee_ids: employeesIds,
            status: serviceStatus,
            images: uploadedImages,
            image: defaultImage
        }
        onConfirm(data);
        console.log(data)
    }, [defaultImage, discountType, editorState, employeeName, id, onConfirm, serviceData.category.id, serviceData.location.id, serviceData.time, serviceData.time_type, serviceDiscount, serviceName, servicePrice, serviceStatus, uploadedImages])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="service-name" label={t('name')} variant="outlined" value={serviceName} onChange={serviceNameChangeHandler} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{width: '100%' }}>
                    <Select
                        value={serviceStatus}
                        onChange={serviceStatusChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='active'>{t('active')}</MenuItem>
                        <MenuItem value='expired'>{t('expired')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <EditorWrapper>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorChange}
                        textAlignment={themeCtx.direction === 'rtl' ? 'right' : 'left'}
                    />
                </EditorWrapper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="service-price" type='number' label={t('price')} variant="outlined" value={servicePrice} onChange={servicePriceChangeHandler} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormGroup>
                    <CustomTextField id="service-discount" type='number' label={t('discount')} variant="outlined" value={serviceDiscount} onChange={serviceDiscountChangeHandler} />
                    <FormControl sx={{ minWidth: 120, ml: 1 }}>
                        <Select
                            value={discountType}
                            onChange={discountTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='percent'>{t('Percent')}</MenuItem>
                            <MenuItem value='fixed'>{t('Fixed')}</MenuItem>
                        </Select>
                    </FormControl>
                </CustomFormGroup>
            </Grid>
            <Grid item xs={12}>
                <PriceCalculation>
                    <p>{t('price after discount')}</p>
                    <p>{priceAfterDiscount}</p>
                </PriceCalculation>
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="employee-label">{t('employee')}</InputLabel>
                    <Select
                        labelId="employee-label"
                        id="select-multiple-employees"
                        multiple
                        value={employeeName}
                        onChange={handleEmployeesChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value.id} label={value.name} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        { fetchedEmployees.map((employee) => (
                            <MenuItem
                                key={employee.id}
                                value={employee}
                                style={getStyles(employee, employeeName, themeCtx.theme)}
                            >
                                {employee.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <ImageUploading
                    multiple
                    value={uploadedImages}
                    onChange={onImageChangeHandler}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                            <UploadImageTopBar>
                                <Button size="medium" sx={{ mr: 2, color: isDragging && 'red' }} variant="contained" startIcon={<PhotoCamera />} {...dragProps} onClick={onImageUpload} >
                                    {t('upload')}
                                </Button>
                                <Button size="medium" variant="outlined" startIcon={<DeleteIcon />} onClick={onImageRemoveAll}>
                                    {t('Remove all')}
                                </Button>
                            </UploadImageTopBar>
                            <UploadImageBody>
                                <RadioGroup
                                    aria-label="gender"
                                    name="controlled-radio-buttons-group"
                                    value={defaultImage}
                                    onChange={defaultImageHandler}
                                    sx={{ width: '100%' }}
                                >
                                    <Grid container sx={{ width: '100%' }}  spacing={2} >
                                        {imageList.map((image, index) => (
                                            <Grid item xs={12} sm={6} key={index} >
                                                <div style={ {width: '100%'} } >
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <ImageItemBottomBar>
                                                        <FormControlLabel value={image['data_url']} control={<Radio />} label="Default" />
                                                        <Button sx={{ mr: 1 }} size="large" variant="outlined" startIcon={<PhotoCamera />} onClick={() => onImageUpdate(index)}>
                                                            {t('update')}
                                                        </Button>
                                                        <IconButton aria-label="delete" size="large" onClick={() => onImageRemove(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </ImageItemBottomBar>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </UploadImageBody>
                        </div>
                    )}
                </ImageUploading>
            </Grid>
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmEditHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedEmployees: state.employees.employees,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployeesHandler: (lang) => dispatch(fetchEmployees(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditModal);