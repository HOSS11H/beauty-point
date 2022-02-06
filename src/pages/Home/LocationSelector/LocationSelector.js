import { Backdrop, Fade, Grid, Modal } from "@mui/material";
import v1 from "../../../utils/axios-instance-v1";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, {css} from "styled-components";
import { CardHeading, CustomCardMui, CustomContainer } from "../../../components/UI/Modal/Modal";
import ThemeContext from "../../../store/theme-context";
import Loader from "../../../components/UI/Loader/Loader";

const Wrapper = styled.div`
    padding: 20px;
`

const City = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    border-radius: 12px;
    background-color: ${props => props.theme.vars.theme};
    border: 5px solid;
    border-color: ${props => props.theme.vars.theme};;
    padding: 10px 15px;
    font-size: 16px;
    color: ${({ theme }) => theme.palette.common.white};
    transition: 0.2s ease-in-out;
    cursor: pointer;
    text-align: left;
    &:hover {
        background-color: ${({ theme }) => theme.palette.common.white};
        border-color: ${props => props.theme.vars.theme};
        color: ${props => props.theme.vars.theme};
    }
    ${ ( { activeItem } ) => activeItem && css`
    background-color: ${({ theme }) => theme.palette.common.white};
        border-color: ${props => props.theme.vars.theme};
        color: ${props => props.theme.vars.theme};
    `}
`


const LocationSelector = props => {

    const { show, onConfirm } = props;

    const themeCtx = useContext(ThemeContext);
    const { lang, city } = themeCtx;

    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState(null);

    const { t } = useTranslation();


    useEffect(() => {
        setLoading(true);
        v1.get(`/locations`, {
            headers: {
                'Accept-Language': lang
            }
        })
            .then(res => {
                setLoading(false);
                setCities(res.data);
            })
            .catch(err => {
                setLoading(false);
            })
    }, [lang])

    let content;
    if (loading) {
        content = (
            <Loader height='150px' />
        )
    }

    if (cities && cities.length > 0) {
        content = (
            <Wrapper>
                <Grid container spacing={2} >
                    {cities.map( (cityObj, index) => {
                        const activeItem = cityObj.id === city
                        return (
                            <Grid key={index} item xs={12} sm={6} md={4}>
                                <City onClick={() => onConfirm(cityObj.id)} activeItem={activeItem} >{cityObj.name}</City>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </Wrapper>
        )
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={show}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{ zIndex: 9999 }}
        >
            <Fade in={show}>
                <CustomContainer container>
                    <Grid item xs={1} sm={1} md={2} />
                    <Grid item xs={10} sm={10} md={8}>
                        <CustomCardMui>
                            <CardHeading>
                                <h4>{t('choose your city')}</h4>
                            </CardHeading>
                            {content}
                        </CustomCardMui>
                    </Grid>
                </CustomContainer>
            </Fade>
        </Modal>
    )
}

export default LocationSelector;