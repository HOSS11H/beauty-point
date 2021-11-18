import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';


const CustomTextField = styled(TextField)`
    width: 100%;
`



const EditModal = (props) => {

    const { t } = useTranslation();

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedServices } = props;

    let serviceData = useMemo(() => {
        return {
            name: '',
            slug: '',
        }
    }, []);

    const [serviceName, setServiceName] = useState(serviceData.name);

    const [serviceSlug, setServiceSlug] = useState(serviceData.slug)

    const [editorState, setEditorState] = useState(
        EditorState.createEmpty()
    )

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
    }, [serviceData, id, serviceName, serviceSlug]);


    const serviceNameChangeHandler = (event) => {
        setServiceName(event.target.value);
        setServiceSlug(event.target.value.replace(/\s+/g, '-').toLowerCase());
    }

    const onEditorChange = newState => {
        setEditorState(newState)
    }

    const closeModalHandler = useCallback(() => {
        onClose();
        setServiceName('');
        setServiceSlug('');
    }, [onClose])


    let content;

    if (serviceData) {
        content = (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="service-name" label={t('name')} variant="outlined" value={serviceName} onChange={serviceNameChangeHandler} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField id="service-slug" label={t('slug')} variant="outlined" value={serviceSlug} />
                </Grid>
                <Grid item xs={12}>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={onEditorChange}
                    />
                </Grid>
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={closeModalHandler} >
            {content}
        </CustomModal>
    )
}

export default EditModal;