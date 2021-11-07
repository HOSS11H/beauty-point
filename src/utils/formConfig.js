import Input from '../components/UI/Input/Input';
import {
    requiredRule,
    minLengthRule,
    maxLengthRule,
    passwordMatchRule,
    isEmailRule,
} from './inputValidationRules';
/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 * @param {array} options - options value for the select input
 * @param {boolean} valid - default value for the input (we set them intially for rhe select Inputs)
 * @param {boolean} touched - default value for the input (we set them intially for rhe select Inputs)
 */
function createFormFieldConfig(label, placeholder, name, type, defaultValue = '', options = null , valid= false , touched = false , showPassword= null ) {
    return {
        renderInput: (handleChange, value, isValid, error, key) => {
            return (
                <Input
                    key={key}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    label={label}
                    isValid={isValid}
                    value={value}
                    handleChange={handleChange}
                    errorMessage={error}
                    options={options}
                    showPassword={showPassword}
                />
            );
        },
        label,
        placeholder,
        value: defaultValue,
        valid: valid,
        errorMessage: '',
        touched: touched,
    };
}

// object representation of Login form
export const loginForm = {
    email : {
        ...createFormFieldConfig( 'بريد الكتروني'  ,'admin@example.com', 'email', 'email'),
        validationRules: [
            requiredRule('email'),
            isEmailRule('email'),
        ],
    },
    password : {
        ...createFormFieldConfig( 'الرقم السري' ,'......', 'password', 'password',undefined ,undefined , undefined , undefined , false),
        validationRules : [
            requiredRule('password'),
        ]
    }
}
// object representation of Signup form
export const signupForm = {
    email : {
        ...createFormFieldConfig('Email', 'email', 'text'),
        validationRules: [
            requiredRule('email'),
            minLengthRule('email', 4),
            isEmailRule('email'),
        ],
    },
    password : {
        ...createFormFieldConfig('Password', 'password', 'password',),
        validationRules : [
            requiredRule('password'),
            minLengthRule('password', 4),
            maxLengthRule('password', 8),
        ]
    } ,
    confirmPassword : {
        ...createFormFieldConfig('Enter Password Again', 'confirmPassword', 'password'),
        validationRules : [
            passwordMatchRule(),
        ]
    }
}