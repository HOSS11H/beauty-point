import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "dashboard": "dashboard",
            'total bookings: ': 'total bookings: ',
        }
    },
    ar: {
        translation: {
            'total bookings: ': ' : مجموع الحجوزات',
            'of': 'من',
            'image': 'الصورة',
            'name': 'الاسم',
            'location': 'الموقع',
            'category': 'الفئة',
            'price': 'السعر',
            'price after discount': 'السعر بعد الخصم',
            'assigned emploees': 'الموظفين المختارين',
            'status': 'الحالة',
            'actions': 'الإجراءات',
            'Edit': 'تعديل',
            'View': 'عرض',
            'Remove': 'حذف',
            "dashboard": "لوحة التحكم",
            'services': 'الخدمات',
            'products': 'المنتجات',
            'customers': 'العملاء',
            'employees': 'الموظفين',
            'deals': 'العروض',
            'bookings': 'الحجوزات',
            'points of sales': 'نقاط البيع',
        }
    }
};
const intialLanguage = localStorage.getItem('language') || 'ar';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: intialLanguage, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;