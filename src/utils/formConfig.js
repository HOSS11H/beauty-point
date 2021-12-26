import Input from '../components/UI/Input/Input';
import {
    requiredRule,
    isNumberRule,
    requiredCheckRule,
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
        name,
        value: defaultValue,
        valid: valid,
        errorMessage: '',
        touched: touched,
    };
}

// object representation of Login form
export const loginForm = {
    email : {
        ...createFormFieldConfig( {ar: 'بريد الكتروني أو رقم هاتف', en: 'email or number' }  ,'admin@example.com', 'email', 'email'),
        validationRules: [
            requiredRule({en: `email or phone required`, ar: `بريد الكتروني أو رقم هاتف مطلوب`}),
        ],
    },
    password : {
        ...createFormFieldConfig( { ar: 'الرقم السري', en: 'password' }  ,'......', 'password', 'password',undefined ,undefined , undefined , undefined , false),
        validationRules : [
            requiredRule( { en: `password required`, ar: `رقم السر مطلوب` }),
        ]
    }
}
// object representation of Subscribe form
export const subscribeForm = {
    email : {
        ...createFormFieldConfig( {ar: 'بريد الكتروني', en: 'email' }  ,'admin@example.com', 'email', 'email'),
        validationRules: [
            requiredRule('email', {en: `email required`, ar: `بريد الكتروني مطلوب`}),
            isEmailRule( {en: `email should be a valid email`, ar: `البريد الالكتروني يجب أن يكون بريد الكتروني صحيح`}),
        ],
    },
    password : {
        ...createFormFieldConfig( { ar: 'الرقم السري', en: 'password' }  ,'......', 'password', 'password',undefined ,undefined , undefined , undefined , false),
        validationRules : [
            requiredRule( { en: `password required`, ar: `رقم السر مطلوب` }),
        ]
    },
    confirmPassword : {
        ...createFormFieldConfig( { ar: 'تأكيد الرقم السري', en: 're-enter password' }  ,'......', 'confirmPassword', 'password',undefined ,undefined , undefined , undefined , false),
        validationRules : [
            passwordMatchRule({ ar: 'يجب تطابق كلمتي المرور', en: `passwords don't match` }),
        ]
    },
    name: {
        ...createFormFieldConfig({ ar: 'الاسم', en: 'name' }, 'ahmed masoud', 'name', 'text'),
        validationRules: [
            requiredRule( {en: `name required`, ar: `الاسم مطلوب`} ),
        ],
    },
    sallonName: {
        ...createFormFieldConfig({ ar: 'اسم الصالون', en: 'sallon name' }, 'ahmed masoud sallon' ,'sallonName', 'text'),
        validationRules: [
            requiredRule( {en: `sallon name required`, ar: `اسم الصالون مطلوب`} ),
        ],
    },
    address: {
        ...createFormFieldConfig({ ar: 'العنوان', en: 'address' }, 'foo bar zee address' ,'address', 'address'),
        validationRules: [
            requiredRule( {en: `address required`, ar: `عنوان الصالون مطلوب`} ),
        ],
    },
    phoneNum: {
        ...createFormFieldConfig({ ar: 'رقم الهاتف', en: 'phone' }, '123321123' ,'phoneNum', 'phone'),
        validationRules: [
            requiredRule( {en: `phone number required`, ar: `رقم الهاتف مطلوب`} ),
            isNumberRule( {en: `phone number should be a number`, ar: `رقم الهاتف يجب أن يكون رقم`} ),
        ],
    },
    website: {
        ...createFormFieldConfig({ ar: 'رابط الموقع', en: 'website link' }, 'https://website.com' ,'website', 'website'),
        validationRules: [
            requiredRule( {en: `website link required`, ar: `رابط الموقع مطلوب`} ),
        ],
    },
    terms: {
        ...createFormFieldConfig(
        { 
            ar: {text: 'انا موافق علي بند الاستخدام وسياسة الخصوصية وقد قرأتها بالكامل', linkText: 'بنود الاستخدام وسياسة الخصوصية', } , 
            en: {text: 'I have read and agree terms & conditions', linkText: 'view terms & conditions', } ,
            link: 'https://beautypoint.app',
        },
        undefined  ,'terms', 'checkbox', false ),
        validationRules: [
            requiredCheckRule( {en: `you should agree terms & conditions`, ar: `يجب أن توافق علي بنود الاستخدام وسياسة الخصوصية`} ),
        ],
    },
}