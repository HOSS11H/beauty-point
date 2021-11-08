import { useContext, useState } from "react";
import ThemeContext from "../../../store/theme-context";

import styled from "styled-components";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WebIcon from '@mui/icons-material/Web';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';




const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 20px;
    text-align: left;
`
const InputLabel = styled.label`
    font-size:18px;
    font-weight: 600;;
    color: ${ ( { theme } ) => theme.palette.text.secondary };
    text-transform: capitalize;
    margin-bottom: 10px;
    text-align: center;
`

const ErrorMessage = styled.p`
    margin-top: 3px;
    color: #DF1338;
    text-transform: capitalize;
    margin-bottom: 0;
    color: ${ ( { theme } ) => theme.palette.error.main };
`

const CustomCheckbox = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    margin-bottom: 15px;
    span {
        color: ${ ( { theme } ) => theme.palette.text.secondary };
    }
    a {
        display: block;
        color: ${ ( { theme } ) => theme.palette.primary.main };
    }
`
const CustomLabel = styled.label`
    font-size: 15px;
    font-weight: 400;
    text-align: left;
    margin-bottom: 0;
    span {
        color: ${ ( { theme } ) => theme.palette.text.secondary };
    }
    a {
        display: inline-block;
        margin-left: 5px;
        color: ${ ( { theme } ) => theme.palette.primary.main };
    }
`

const Input = ( props ) => {

    
    const {
        label,
        placeholder,
        type,
        name,
        handleChange,
        errorMessage,
        isValid,
        value,
        options,
        showPassword
    } = props;
    
    const [ passwordVisible, setPasswordVisible ] = useState(showPassword);

    const themeCtx = useContext(ThemeContext)

    const handlePasswordChange = () => {
        setPasswordVisible(prevState => !prevState);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
        <InputContainer>
            {
                type !== 'checkbox' && <InputLabel>{themeCtx.direction === 'rtl' ?  label.ar : label.en }</InputLabel>
            }
            {
                type === 'text' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type={type} name={name} value={value} onChange={handleChange}
                    />
            }
            {
                type === 'email' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type= 'email' name={name} value={value} onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
            }
            {
                type === 'password' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type={ passwordVisible ?  'text' : type } name={name} value={value} onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handlePasswordChange}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />
            }
            {
                type === 'select' &&
                    <TextField
                        id={name}
                        select
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        variant="outlined"
                    >
                        {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
            }
            {
                type === 'address' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type= 'text' name={name} value={value} onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RoomOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
            }
            {
                type === 'phone' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type= 'text' name={name} value={value} onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalPhoneIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
            }
            {
                type === 'website' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type= 'text' name={name} value={value} onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <WebIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
            }
            {
                type === 'checkbox' &&
                    <CustomCheckbox>
                        <Checkbox 
                            id={name}
                            name={name}
                            checked={value}
                            onChange={ (e) => handleChange({ target : { name: name, value: e.target.checked } }) }
                            inputProps={{ 'aria-label': 'controlled' }} />
                        <CustomLabel >
                            <span>{themeCtx.direction === 'rtl' ?  label.ar.text : label.en.text }</span>
                            <a href={label.link}>{themeCtx.direction === 'rtl' ?  label.ar.linkText : label.en.linkText }</a>
                        </CustomLabel>
                    </CustomCheckbox>
            }
            {errorMessage && !isValid && (
                <ErrorMessage>{themeCtx.direction === 'rtl' ?  errorMessage.ar : errorMessage.en }</ErrorMessage>
            )}
        </InputContainer>
    )
}

export default Input