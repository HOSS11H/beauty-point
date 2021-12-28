import { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ThemeContext from '../../../../../store/theme-context'

import { CustomModal } from '../../../../../components/UI/Modal/Modal';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';

import ImageUploading from 'react-images-uploading';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import { fetchLocations } from '../../../../../store/actions/index';
import { formatCurrency } from '../../../../../shared/utility';
import ValidationMessage from '../../../../../components/UI/ValidationMessage/ValidationMessage';


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
    margin-top: 10px;
    margin-bottom: 10px;
    p {
        font-size: 20px;
        line-height:1.5;
        text-transform: uppercase;
        font-weight: 600;
        color: ${({ theme }) => theme.palette.text.primary};
        margin-right: 20px;
        &:last-child {
            margin-right: 0;
        }
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
    margin-bottom: 15px;
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
        color: ${({ theme }) => theme.palette.common.black};
        justify-content: space-between;
    }
    .rdw-dropdown-optionwrapper {
        color: ${({ theme }) => theme.palette.common.black};
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


const CreateModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, fetchedLocations, fetchLocationsHandler,  creatingProductSuccess} = props;

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)
    const { lang } = themeCtx;

    const [productName, setProductName] = useState('');
    const [productNameError, setProductNameError] = useState(false);
    
    
    
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )
    const [productDescriptionError, setProductDescriptionError] = useState(false);
        
    const [productPrice, setProductPrice] = useState(0);
    
    const [productDiscount, setProductDiscount] = useState(0);
    
    const [discountType, setDiscountType] = useState('percent');
    
    const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
    const [productPriceError, setProductPriceError] = useState(false);
    
    const [productQuantity, setProductQuantity] = useState(0);
    const [productQuantityError, setProductQuantityError] = useState(false);

    const [locationName, setLocationName] = useState('');
    const [productLocationError, setProductLocationError] = useState(false);

    const [productStatus, setProductStatus] = useState('active');

    const [uploadedImages, setUploadedImages] = useState([]);

    const [defaultImage, setDefaultImage] = useState('');
    const [defaultImageError, setDefaultImageError] = useState(false);

    const maxNumber = 69;

    useEffect(() => {
        let netPrice;
        if (discountType === 'percent') {
            netPrice = (productPrice - (productPrice * (productDiscount / 100))).toFixed(2);
            setPriceAfterDiscount(netPrice > 0 ? netPrice : 0);
            netPrice > 0 ? setProductPriceError(false) : setProductPriceError(true);
        } else if (discountType === 'fixed') {
            netPrice = (productPrice - productDiscount).toFixed(2);
            setPriceAfterDiscount(netPrice > 0 ? netPrice : 0)
            netPrice > 0 ? setProductPriceError(false) : setProductPriceError(true);
        }
    }, [discountType, productDiscount, productPrice])

    useEffect(() => {
        fetchLocationsHandler(lang);
    }, [fetchLocationsHandler, lang])


    const productNameChangeHandler = (event) => {
        setProductName(event.target.value);
        setProductNameError(false);
    }

    const onEditorChange = newState => {
        setEditorState(newState);
        setProductDescriptionError(false);
    }

    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        // data for submit
        setUploadedImages(imageList);
        if (imageList.length === 1) {
            setDefaultImage(imageList[0].data_url);
            setDefaultImageError(false);
        } else {
            setDefaultImage('');
        }
    };
    const defaultImageHandler = (event) => {
        setDefaultImage(event.target.value);
        setDefaultImageError(false);
    };

    const productPriceChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setProductPrice(event.target.value);
        }
    }
    const productDiscountChangeHandler = (event) => {
        if (event.target.value >= 0 ) {
            setProductDiscount(event.target.value);
        }
    }
    const discountTypeChangeHandler = (event) => {
        setDiscountType(event.target.value);
    }
    const productQuantityChangeHandler = (event) => {
        if (event.target.value >= 0) {
            setProductQuantity(event.target.value);
            setProductQuantityError(false);
        }
    }
    const productStatusChangeHandler = (event) => {
        setProductStatus(event.target.value);
    }

    const handleLocationChange = (event) => {
        const {
            target: { value },
        } = event;
        setLocationName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setProductLocationError(false);
    };
    const closeModalHandler = useCallback(() => {
        onClose();
    }, [onClose])

    const resetModalData = useCallback(() => {
        setProductName('');
        setProductNameError(false);
        setEditorState(EditorState.createEmpty());
        setProductDescriptionError(false);
        setProductPrice(0);
        setProductPriceError(false);
        setProductDiscount(0);
        setPriceAfterDiscount(0);
        setDiscountType('percent');
        setLocationName('');
        setProductLocationError(false);
        setProductQuantity(0);
        setProductQuantityError(false);
        setProductStatus('active');
        setUploadedImages([]);
        setDefaultImage('');
        setDefaultImageError(false);
    }, [])

    useEffect(() => {
        creatingProductSuccess && resetModalData();
    }, [creatingProductSuccess, resetModalData])

    const confirmCreateHandler = useCallback(() => {
        if ( productName.trim().length === 0 ) {
            setProductNameError(true);
            return;
        }
        if (editorState.getCurrentContent().hasText() === false) {
            setProductDescriptionError(true);
            return;
        }

        if ( productPriceError)   { return; }
        
        if (locationName === '') {
            setProductLocationError(true);
            return;
        }
        if (+productQuantity === 0) { 
            setProductQuantityError(true);
            return; 
        }

        const selectedLocation = fetchedLocations.find(location => location.id === locationName);

        const data = {
            name: productName,
            description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            price: +productPrice,
            discount: +productDiscount,
            discount_type: discountType,
            discount_price: +priceAfterDiscount,
            location_id: locationName,
            quantity: +productQuantity,
            status: productStatus,
            images: uploadedImages,
            image: defaultImage,
            location: selectedLocation,
        };
        onConfirm(data);
    }, [productName, editorState, productPriceError, locationName, productQuantity, defaultImage, fetchedLocations, productPrice, productDiscount, discountType, priceAfterDiscount, productStatus, uploadedImages, onConfirm])

    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="product-name" label={t('name')} variant="outlined" value={productName} onChange={productNameChangeHandler} />
                {productNameError && <ValidationMessage notExist>{t(`Please add name`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <Select
                        value={productStatus}
                        onChange={productStatusChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='active'>{t('active')}</MenuItem>
                        <MenuItem value='inactive'>{t('inactive')}</MenuItem>
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
                {productDescriptionError && <ValidationMessage notExist>{t(`Please add Description`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="product-price" type='number' label={t('price')} variant="outlined" value={productPrice} onChange={productPriceChangeHandler} />
                {productPriceError && <ValidationMessage notExist>{t(`Please add Price`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormGroup>
                    <CustomTextField id="product-discount" type='number' label={t('discount')} variant="outlined" value={productDiscount} onChange={productDiscountChangeHandler} />
                    <FormControl sx={{ minWidth: 120, ml: 1 }}>
                        <Select
                            value={discountType}
                            onChange={discountTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='percent'>{t('percent')}</MenuItem>
                            <MenuItem value='fixed'>{t('Fixed')}</MenuItem>
                        </Select>
                    </FormControl>
                </CustomFormGroup>
            </Grid>
            <Grid item xs={12}>
                <PriceCalculation>
                    <p>{t('price after discount')}</p>
                    <p>{formatCurrency(priceAfterDiscount)}</p>
                </PriceCalculation>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="location-label">{t('location')}</InputLabel>
                    <Select
                        value={locationName}
                        onChange={handleLocationChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {fetchedLocations.map((location) => (
                            <MenuItem
                                key={location.id}
                                value={location.id}
                            >
                                {location.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {productLocationError && <ValidationMessage notExist>{t(`Please add Location`)}</ValidationMessage>}
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="product-quantity" type='number' label={t('quantity')} variant="outlined" value={productQuantity} onChange={productQuantityChangeHandler} />
                {productQuantityError && <ValidationMessage notExist>{t(`Please add Quantity`)}</ValidationMessage>}
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
                            <UploadImageBody>
                                <RadioGroup
                                    aria-label="gender"
                                    name="controlled-radio-buttons-group"
                                    value={defaultImage}
                                    onChange={defaultImageHandler}
                                    sx={{ width: '100%' }}
                                >
                                    <Grid container sx={{ width: '100%' }} spacing={2} >
                                        {imageList.map((image, index) => (
                                            <Grid item xs={12} sm={6} key={index} >
                                                <div style={{ width: '100%' }} >
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
                            <UploadImageTopBar>
                                <Button size="medium" sx={{ mr: 2, color: isDragging && 'red' }} variant="contained" startIcon={<PhotoCamera />} {...dragProps} onClick={onImageUpload} >
                                    {t('photos')}
                                </Button>
                                <Button size="medium" variant="outlined" startIcon={<DeleteIcon />} onClick={onImageRemoveAll}>
                                    {t('Remove all')}
                                </Button>
                            </UploadImageTopBar>
                        </div>
                    )}
                </ImageUploading>
                {defaultImageError && <ValidationMessage notExist>{t(`Please add default Image`)}</ValidationMessage>}
            </Grid>
        </Grid>
    )
    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={confirmCreateHandler} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchedLocations: state.locations.locations,
        creatingProductSuccess: state.products.creatingProductSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocationsHandler: (lang) => dispatch(fetchLocations(lang)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);