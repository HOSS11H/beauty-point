/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
function createValidationRule(ruleName, errorMessage, validateFunc) {
    return {
        name: ruleName,
        message: errorMessage,
        validate: validateFunc,
    };
}

export function requiredRule(errorMessage) {
    return createValidationRule(
        'required',
        errorMessage,
        (inputValue, formObj) => inputValue.length !== 0
    );
}
export function requiredCheckRule(errorMessage) {
    return createValidationRule(
        'required',
        errorMessage,
        (inputValue, formObj) =>  inputValue === true
    );
}

export function isEmailRule(errorMessage) {
    return createValidationRule(
        'isEmail',
        errorMessage,
        (inputValue, formObj) => {
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(inputValue);
        }
    );
}

export function requiredLengthRule(inputName, requiredCharacters) {
    return createValidationRule(
        'requiredLength',
        `${inputName} must be ${requiredCharacters} characters`,
        (inputValue, formObj) => inputValue.trim().length === requiredCharacters
    );
}
export function isNumberRule(errorMessage) {
    return createValidationRule(
        'isNumber',
        errorMessage,
        (inputValue, formObj) => {
            return !isNaN(inputValue)
        }    
    );
}

export function minLengthRule(inputName, minCharacters) {
    return createValidationRule(
        'minLength',
        `${inputName} should contain atleast ${minCharacters} characters`,
        (inputValue, formObj) => inputValue.trim().length >= minCharacters
    );
}

export function maxLengthRule(inputName, maxCharacters) {
    return createValidationRule(
        'minLength',
        `${inputName} cannot contain more than ${maxCharacters} characters`,
        (inputValue, formObj) => inputValue.trim().length <= maxCharacters
    );
}

export function passwordMatchRule(errorMessage) {
    return createValidationRule(
        'passwordMatch',
        errorMessage,
        (inputValue, formObj) => inputValue === formObj.password.value
    );
}