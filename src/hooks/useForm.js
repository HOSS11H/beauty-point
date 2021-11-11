import { useState, useCallback } from 'react';

function useForm(formObj) {
    const [form, setForm] = useState(formObj);

    function renderFormInputs() {
        return Object.values(form).map((inputObj) => {
            const { value, name,  errorMessage, valid, renderInput } = inputObj;
            return renderInput(onInputChange, value, valid, errorMessage, name);
        });
    }

    const isInputFieldValid = useCallback(
        (inputField) => {
            for (const rule of inputField.validationRules) {
                if (!rule.validate(inputField.value, form)) {
                    inputField.errorMessage = rule.message;
                    return false;
                }
            }
            return true;
        },
        [form]
        );
        const onInputChange = useCallback(
            (event) => {
                const { name, value } = event.target;
                // copy input object whose value was changed
                const inputObj = { ...form[name] };
                // update value
                inputObj.value = value;
                // update input field's validity
                const isValidInput = isInputFieldValid(inputObj);
                // if input is valid and it was previously invalid
                // set its valid status to true
                if (isValidInput && !inputObj.valid) {
                    inputObj.valid = true;
                } else if (!isValidInput && inputObj.valid) {
                    // if input is not valid and it was previously valid
                    // set its valid status to false
                    inputObj.valid = false;
                }

                // mark input field as touched
                inputObj.touched = true;
                setForm({ ...form, [name]: inputObj });
        },
        [ form, isInputFieldValid ]
    );

    /**
     * returns boolean value indicating whether overall form is valid
     *
     * @param {object} formObj - object representation of a form
     */
    const isFormValid = useCallback(() => {
        let isValid = true;
        const arr = Object.values(form);
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].valid) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }, [form]);
    return { renderFormInputs , isFormValid , form };
}

export default useForm;
