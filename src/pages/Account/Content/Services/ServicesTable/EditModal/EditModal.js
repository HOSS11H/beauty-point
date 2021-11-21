import ThemeContext from '../../../../../../store/theme-context'
import { useMemo, useState, useEffect, useCallback, useContext } from 'react';
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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
function getStyles(name, employeeName, theme) {
    return {
        fontWeight:
            employeeName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const EditModal = (props) => {

    let serviceData = useMemo(() => {
        return {
            name: '',
            slug: '',
            price: '',
            discount: '',
            discount_type: 'percent',
            net_price: '',
            empolyees: [{ id: '1', name: 'abeer', }, { id: '2', name: 'abeer', }, { id: '3', name: 'abeer', }],
            status: 'active',
            description: ',<h3>Describe</h3>',
        }
    }, []);

    const { t } = useTranslation();

    const themeCtx = useContext(ThemeContext)

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedServices } = props;

    const [images, setImages] = useState([]);

    const maxNumber = 69;

    const [defaultImage, setDefaultImage] = useState('');

    const defaultImageHandler = (event) => {
        setDefaultImage(event.target.value);
    };

    const [serviceName, setServiceName] = useState(serviceData.name);

    const [serviceSlug, setServiceSlug] = useState(serviceData.slug)

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )

    // Convert Draft to HTML
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState)
    
    // Convert HTML to Draft
    
    useEffect(() => {
        const html = serviceData.description;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            setEditorState(EditorState.createWithContent(contentState))
        }
    }, [])

    const [servicePrice, setServicePrice] = useState(serviceData.price);

    const [serviceDiscount, setServiceDiscount] = useState(serviceData.discount);

    const [discountType, setDiscountType] = useState(serviceData.discount_type);

    const [priceAfterDiscount, setPriceAfterDiscount] = useState(serviceData.net_price);

    const [employeeName, setPersonName] = useState([]);

    const [serviceStatus, setServiceStatus] = useState(serviceData.status);

    const onImageChangeHandler = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
    };

    if (id) {
        const serviceIndex = fetchedServices.data.findIndex(service => service.id === id);
        serviceData = { ...fetchedServices.data[serviceIndex] };
    }

    useEffect(() => {
        if (id && serviceName === '') {
            setServiceName(serviceData.name);
        }
        if (id && serviceSlug === '') {
            setServiceSlug(serviceData.slug);
        }
        if (id && servicePrice === '') {
            setServicePrice(serviceData.price);
        }
        if (id && serviceDiscount === '') {
            setServiceDiscount(serviceData.discount);
        }
        if (id && discountType === 'percent') {
            setDiscountType(serviceData.discount_type);
        }
        if (id && priceAfterDiscount === '') {
            console.log('excuted')
            setPriceAfterDiscount(serviceData.net_price);
        }
        if (id && serviceStatus === '') {
            console.log('excuted')
            setServiceStatus(serviceData.net_price);
        }
    }, [serviceData, id, serviceName, serviceSlug, servicePrice, discountType, serviceDiscount, priceAfterDiscount, serviceStatus]);


    const serviceNameChangeHandler = (event) => {
        setServiceName(event.target.value);
        setServiceSlug(event.target.value.replace(/\s+/g, '-').toLowerCase());
    }

    const onEditorChange = newState => {
        setEditorState(newState)
        console.log(newState)
    }
    const servicePriceChangeHandler = (event) => {
        setServicePrice(event.target.value);
    }
    const serviceDiscountChangeHandler = (event) => {
        setServiceDiscount(event.target.value);
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
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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

    const closeModalHandler = useCallback(() => {
        onClose();
        setServiceName('');
        setServiceSlug('');
        setServicePrice('')
        setDiscountType('percent')
        setPriceAfterDiscount('')
    }, [onClose])


    let content = (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="service-name" label={t('name')} variant="outlined" value={serviceName} onChange={serviceNameChangeHandler} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomTextField id="service-slug" label={t('slug')} variant="outlined" value={serviceSlug} />
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
                <CustomTextField id="service-price" label={t('price')} variant="outlined" value={servicePrice} onChange={servicePriceChangeHandler} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <CustomFormGroup>
                    <CustomTextField id="service-discount" label={t('discount')} variant="outlined" value={serviceDiscount} onChange={serviceDiscountChangeHandler} />
                    <FormControl sx={{ minWidth: 120, ml: 1 }}>
                        <Select
                            value={discountType}
                            onChange={discountTypeChangeHandler}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value='percent'>percent</MenuItem>
                            <MenuItem value='fixed'>fixed</MenuItem>
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
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, employeeName, themeCtx.theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <ImageUploading
                    multiple
                    value={images}
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
                                    upload
                                </Button>
                                <Button size="medium" variant="outlined" startIcon={<DeleteIcon />} onClick={onImageRemoveAll}>
                                    Remove all
                                </Button>
                            </UploadImageTopBar>
                            <UploadImageBody>
                                <RadioGroup
                                    aria-label="gender"
                                    name="controlled-radio-buttons-group"
                                    value={defaultImage}
                                    onChange={defaultImageHandler}
                                >
                                    <Grid container spacing={2} >
                                        {imageList.map((image, index) => (
                                            <Grid item xs={12} sm={6} key={index} >
                                                <img src={image['data_url']} alt="" width="100" />
                                                <ImageItemBottomBar>
                                                    <FormControlLabel value={image['data_url']} control={<Radio />} label="Default" />
                                                    <Button sx={{ mr: 1 }} size="large" variant="outlined" startIcon={<PhotoCamera />} onClick={() => onImageUpdate(index)}>
                                                        update
                                                    </Button>
                                                    <IconButton aria-label="delete" size="large" onClick={() => onImageRemove(index)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ImageItemBottomBar>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </UploadImageBody>
                        </div>
                    )}
                </ImageUploading>

            </Grid>
            <Grid item xs={12} sm={4}>
                <FormControl sx={{ m: 1, width: '100%' }}>
                    <Select
                        value={serviceStatus}
                        onChange={serviceStatusChangeHandler}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value='active'>active</MenuItem>
                        <MenuItem value='expired'>expired</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

export default EditModal;