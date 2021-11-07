import styled from "styled-components";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from "react";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0 20px;
    text-align: left;
`
const InputLabel = styled.label`
    font-size:18px;
    font-weight: 600;;
    color: #9b9b9b;
    text-transform: capitalize;
    margin-bottom: 10px;
    text-align: center;
`

const ErrorMessage = styled.p`
    margin-top: 3px;
    color: #DF1338;
    text-transform: capitalize;
    margin-bottom: 0;
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

    const handlePasswordChange = () => {
        setPasswordVisible(prevState => !prevState);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
        <InputContainer>
            <InputLabel>{label}</InputLabel>
            {
                type === 'text' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type={type} name={name} value={value} onChange={handleChange}
                    />
            }
            {
                type === 'email' &&
                    <TextField id={name} placeholder={placeholder} variant="outlined" 
                        type= 'text' name={name} value={value} onChange={handleChange}
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
            {errorMessage && !isValid && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
            )}
        </InputContainer>
    )
}

export default Input