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
            'employee': 'موظف',
            'deals': 'العروض',
            'bookings': 'الحجوزات',
            'points of sales': 'نقاط البيع',
            'completed bookings': 'الحجوزات المكتملة',
            'pending bookings': 'الحجوزات المعلقة',
            'approved bookings': 'الحجوزات المؤكدة',
            'in progress bookings': 'الحجوزات الجارية',
            'canceled bookings': 'الحجوزات الملغية',
            'total earnings': 'إجمالي الربح',
            'Do you want To delete this service?': 'هل تريد حذف هذه الخدمة؟',
            'delete': 'حذف',
            'close': 'إغلاق',
            'You will not be able to recover the deleted record!': 'لن تستطيع استرداد السجل المحذوف!',
            'quantity': 'الكمية',
            'starts at': 'يبدأ في',
            'ends at': 'ينتهي في',
            'original price': 'السعر الأصلي',
            'deal price': 'السعر بعد التخفيض',
            'deal usage': 'حد استخدام العرض',
            'view service details': 'عرض تفاصيل الخدمة',
            'edit': 'تعديل',
            'discount type': 'نوع الخصم',
            'discount value': 'قيمة الخصم',
            'product name': 'اسم المنتج',
            'description': 'الوصف',
            'Do you want To delete this product?': 'هل تريد حذف هذا المنتج؟',
            'view product details': 'عرض تفاصيل المنتج',
            'Do you want To delete this deal?': 'هل تريد حذف هذا العرض؟',
            'view deal details': 'عرض تفاصيل العرض',
            'applies between': 'تنطبق بين',
            'edit service details': 'تعديل تفاصيل الخدمة',
            'search': 'بحث',
            'Search...': 'بحث...',
            'No Deals Found': 'لا توجد عروض',
            'No Services Found': 'لا توجد خدمات',
            'No Products Found': 'لا توجد منتجات',
            'discount': 'الخصم',
            'discount price': 'سعر الخصم',
            'service name': 'اسم الخدمة',
            'Create Service': 'إنشاء خدمة',
            'update': 'تحديث',
            'Remove all': 'حذف الكل',
            'Percent': 'نسبة مئوية',
            'Fixed': 'ثابت',
            'active': 'نشط',
            'inactive': 'غير نشط',
            'upload': 'تحميل',
            'Please add name': 'يرجى إضافة اسم',
            'Please add Description': 'يرجى إضافة وصف',
            'Please add Price': 'يرجى إضافة سعر',
            'Please add Time': 'يرجى إضافة وقت',
            'Please add Category': 'يرجى إضافة فئة',
            'Please add Location': 'يرجى إضافة موقع',
            'Please add default Image': 'يرجى إضافة صورة إفتراضية',
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