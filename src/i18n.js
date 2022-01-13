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
            'Default': 'افتراضي',
            'edit product details': 'تعديل تفاصيل المنتج',
            'Create Product': 'إنشاء منتج',
            'create new product': 'إنشاء منتج جديد',
            'Please add Quantity': 'يرجى إضافة كمية',
            'create new service': 'إنشاء خدمة جديدة',
            'service': 'خدمة',
            'title': 'عنوان',
            'uses limit': 'حد استخدام',
            'used time': 'مرات الاستخدام',
            'applied days': 'أيام التطبيق',
            'deal items': 'عناصر العرض',
            'price including taxes': 'السعر شامل الضرائب',
            'total': 'المجموع',
            'Please add email': 'يرجى إضافة بريد الكتروني',
            'email': 'الايميل',
            'Please add number': 'يرجى إضافة رقم',
            'number': 'رقم',
            'reset cart': 'إعادة تعيين السلة',
            'purchase': 'شراء',
            'total taxes': 'إجمالي القيمة المضافة (15%)',
            'Coupon Doesn\'t Exist': 'الكوبون غير موجود',
            'Coupon Exists': 'الكوبون موجود',
            'Coupon': 'كوبون',
            'Discount': 'خصم',
            'Please Add Something': 'يرجى إضافة شيء',
            'No Deals': 'لا توجد عروض',
            'No Products': 'لا توجد منتجات',
            'No Services': 'لا توجد خدمات',
            'Please Choose Customer': 'يرجى اختيار العميل',
            'Customer': 'العميل',
            'add': 'إضافة',
            'Time': 'وقت',
            'Date desktop': 'التاريخ',
            'view items': 'عرض العناصر',
            'Add To Cart': 'إضافة إلى السلة',
            'Type': 'نوع',
            'Services': 'خدمات',
            'Products': 'منتجات',
            'Deals': 'عروض',
            'Location': 'موقع',
            'ALL': 'الكل',
            'Category': 'الفئة',
            'No Items': 'لا توجد عناصر',
            'view booking details': 'عرض تفاصيل الحجز',
            'booking items': 'عناصر الحجز',
            'booking time': 'وقت الحجز',
            'booking date': 'تاريخ الحجز',
            'phone': 'الهاتف',
            'items': 'العناصر',
            'item': 'عنصر',
            'taxes ( 15% )': 'ضريبة القيمة المضافة %15',
            'print': 'طباعة',
            'show receipt': 'عرض الفاتورة',
            'download receipt': 'تحميل الفاتورة',
            'Delete': 'حذف',
            'add services': 'إضافة خدمات',
            'completed': 'مكتمل',
            'pending': 'قيد الانتظار',
            'edit booking details': 'تعديل تفاصيل الحجز',
            'confirm edit': 'تأكيد التعديل',
            'approved': 'موافق',
            'canceled': 'ملغي',
            'in progress': 'قيد التنفيذ',
            'payment method': 'طريقة الدفع',
            'Please choose method': 'يرجى اختيار طريقة',
            'cash remaing': 'المبلغ المتبقي',
            'cash to return': 'الباقي',
            'paid amount': 'المبلغ المدفوع',
            'booking calendar': 'التقويم',
            'reports': 'تقارير العمليات',
            'settings': 'الأعدادات',
            'Tabular Report': 'تقرير جدولي',
            'total amount': 'المبلغ الإجمالي',
            'all': 'الكل',
            'percentage': 'نسبة مئوية',
            'Business Name': 'اسم الشركة',
            'Business Email': 'البريد الالكتروني',
            'Business Phone': 'رقم الهاتف',
            'Tax Record': 'الرقم الضريبي',
            'Address': 'العنوان',
            'Invoice Notes': 'ملاحظات الفاتورة',
            'Save': 'حفظ',
            'Saved Successfuly': 'تم الحفظ بنجاح',
            'Do you want To delete this employee?': 'هل تريد حذف هذا الموظف؟',
            'view employee details': 'عرض تفاصيل الموظف',
            'edit employee details': 'تعديل تفاصيل الموظف',
            'Primary Phone': 'الهاتف الرئيسي',
            'Secondary Phone': 'الهاتف الثانوي',
            'Description': 'الوصف',
            'SEO Description': 'وصف محركات البحث',
            'Keywords':'الكلمات الافتتاحية',
            'save': 'حفظ',
            'Date': 'التاريخ',
            'booking status': 'حالة الحجز',
            'filter': 'فلتر',
            'reset': 'إعادة تعيين',
            'product': 'منتج',
            'deal': 'عرض',
            'payment status': 'حالة الدفع',
            'Booking Number': 'رقم الحجز',
            'no results': 'لا توجد نتائج',
            'mobile number': 'رقم الجوال',
            'reception': 'موظف الاستقبال',
            'administrator': 'مدير',
            'role': 'دور',
            'Please add password': 'يرجى إضافة كلمة المرور',
            'Please add a role': 'يرجى إضافة دور',
            'Please add Number': 'يرجى إضافة رقم الجوال', 
            'Employee Added': 'تمت إضافة الموظف',
            'add new employee': 'إضافة موظف جديد',
            'add employee': 'إضافة موظف',
            'categories': 'الفئات',
            'Date from': 'التاريخ من',
            'Date to': 'التاريخ إلى',
            'choose products': 'اختر المنتجات',
            'choose services': 'اختر الخدمات',
            'booking type': 'نوع الحجز',
            'Employee': 'الموظف',
            'log out': 'تسجيل الخروج',
            'create new deal': 'إنشاء عرض جديد',
            'Create Deal': 'إنشاء عرض',
            'uses time': 'حد الاستخدام',
            'user limit': "حد استخدام العميل ",
            'total deal price': 'السعر الإجمالي للعرض',
            'Open time': 'وقت الفتح',
            'Close time': 'وقت الإغلاق',
            'saturday': 'السبت',
            'sunday': 'الأحد',
            'monday': 'الأثنين',
            'tuesday': 'الثلاثاء',
            'wednesday': 'الأربعاء',
            'thursday': 'الخميس',
            'friday': 'الجمعة',
            'Please add at least one service': 'يرجى إضافة خدمة واحدة على الأقل',
            'applied days must be selected': 'يجب تحديد أيام التطبيق',
            'book': 'حجز',
            'create': 'إنشاء',
            'General': 'عام',
            'Vendor page Settings': 'إعدادات صفحة المتجر',
            'Booking Settings': 'إعدادات الحجز',
            'SN': 'الرقم التسلسلي',
            'Day': 'اليوم',
            'Open Time': 'وقت الفتح',
            'Close Time': 'وقت الإغلاق',
            'Allow Booking': 'السماح بالحجز',
            'Action': 'اجراء',
            'Slot Duration': 'مدة الفترة',
            'minutes': 'دقائق',
            'Multiple Bookings': 'الحجوزات المتعددة',
            'yes': 'نعم',
            'no': 'لا',
            'Maximum Bookings': 'الحجوزات الأقصى',
            'Max Bookings Per Day': 'الحجوزات الأقصى لكل يوم',
            'Max Bookings Per Slot': 'الحجوزات الأقصى لكل فترة',
            'Bookings Status': 'حالة الحجوزات',
            'Enabled': 'مفعل',
            'Disabled': 'غير مفعل',
            'Home': 'الرئيسية',
            'join us': 'انضم لنا',
            'login': 'تسجيل الدخول',
            'select your services': 'اختر خدماتك',
            'popular saloons': 'الصالونات المشهورة',
            'popular spotlights': 'أفضل العروض',
            'popular deals': 'العروض المشهورة',
            'Quick Links': 'روابط سريعة',
            'help & support': 'المساعدة والدعم',
            'Contact us': 'اتصل بنا',
            'about us': 'عنا',
            'add deals': 'إضافة عرض',
            'add products': 'إضافة منتج',
            'add new customer': 'إضافة عميل جديد',
            'total bookings : ': 'مجموع الحجوزات : ',
            'recent booking': 'أخر الحجوزات',
            'percent': 'نسبة',
            'time': 'الوقت',
            'hours': 'ساعات',
            'days': 'أيام',
            'photos': 'صور',
            'Add Product': 'إضافة منتج',
            'add new product': 'إضافة منتج جديد',
            'fixed': 'ثابت',
            'applied on': 'تطبق على',
            'deal uses time': 'حد استخدام العرض',
            'select customer': 'اختر العميل',
            'action': 'اجراء',
            'cash': 'كاش',
            'card': 'شبكة',
            'Discount Coupon': 'كوبون الخصم',
            'show': 'عرض',
            'visit store': 'زيارة المتجر',
            'expenses': 'المصاريف',
            'amount': 'المبلغ',
            'date': 'التاريخ',
            'agent': 'العميل',
            'bank': 'البنك',
            'account': 'الحساب',
            'Do you want To delete this expense?': 'هل تريد حذف هذه المصاريف؟',
            'add new expense': 'إضافة مصاريف جديدة',
            'add expense': 'إضافة مصاريف',
            'Please add bank': 'يرجى إضافة البنك',
            'Please add account': 'يرجى إضافة الحساب',
            'select category': 'اختر الفئة',
            'select agent': 'اختر المورد',
            'Please select category': 'يرجى اختيار الفئة',
            'Please select agent': 'يرجى اختيار المورد',
            'Please add amount': 'يرجى إضافة المبلغ',
            'Do you want To delete this category?': 'هل تريد حذف هذه الفئة؟',
            'add new category': 'إضافة فئة جديدة',
            'add category': 'إضافة فئة',
            'edit category details': 'تعديل تفاصيل الفئة',
            'edit expense details': 'تعديل تفاصيل المصاريف',
            'add customer': 'إضافة عميل',
            'Do you want To delete this customer?': 'هل تريد حذف هذا العميل؟',
            'edit customer details': 'تعديل تفاصيل العميل',
            'all categories': 'كل الفئات',
            'from': 'من',
            'to': 'إلى',
            'gallery': 'معرض الصور',
            'overview': 'نظرة عامة',
            'timing': 'الوقت',
            'bank account': 'الحساب البنكي',
            'agents': 'الموردين',
            'mobile': 'الجوال',
            'add agent': 'إضافة مورد',
            'add new agent': 'إضافة مورد جديد',
            'Do you want To delete this agent?': 'هل تريد حذف هذا المورد؟',
            'edit agent details': 'تعديل تفاصيل المورد',
            'visit old version': 'زيارة النسخة القديمة',
            'attachments': 'المرفقات',
            'agent name': 'المورد',
            'roles & permissions': 'الأدوار و الأذونات',
            'members': 'الأعضاء',
            'view members details': 'عرض تفاصيل الأعضاء',
            'Business Service': 'الخدمات',
            'Employee Group': 'مجموعة الموظفين',
            'Employee Leave': 'إجازات الموظفين',
            'Employee Schedule': 'جدول الموظفين',
            'Settings': 'الإعدادات',
            'Report': 'التقارير',
            'Booking': 'الحجوزات',
            'Deal': 'العروض',
            'group': 'مجموعة',
            'type': 'نوع',
            'Do you want To delete this unit?': 'هل تريد حذف هذه الوحدة؟',
            'edit unit details': 'تعديل تفاصيل الوحدة',
            'add new unit': 'إضافة وحدة جديدة',
            'add unit': 'إضافة وحدة',
            'sub': 'فرعية',
            'main': 'رئيسية',
            'units': 'الوحدات',
            'unit type': 'نوع الوحدة',
            'No Units Found': 'لا توجد وحدات',
            'Please add parent unit': 'يرجى إضافة وحدة رئيسية',
            'service type': 'نوع الخدمة',
            'single': 'فردي',
            'combo': 'كومبو',
            'unit': 'وحدة',
            'add item': 'إضافة عنصر',
            'clear all': 'مسح الكل',
            'piece': 'قطعة',
            'online': 'اونلاين',
            'transfer': 'تحويل',
            'Booking Created': 'تم إنشاء الحجز',
            'Product Added': 'تمت إضافة المنتج',
            'you must add the paid Amount': 'يجب إضافة المبلغ المدفوع',
            'packages': 'الباقات',
            'Free': 'مجاني',
            'Trial': 'تجريبي',
            'per month': 'لكل شهر',
            'per year': 'لكل سنة',
            'max employees': 'أقصي عدد موظفين',
            'max services': 'أقصي عدد خدمات',
            'max deals': 'أقصي عدد العروض',
            'max roles': 'أقصي عدد الأدوار',
            'modules': 'الأقسام',
            'Reports': 'التقارير',
            'POS': 'نقطة البيع',
            'Subscribe': 'الاشتراك',
            'Yearly': 'سنوي',
            'Monthly': 'شهري',
            'Service Added': 'تمت إضافة الخدمة',
            'Back': 'رجوع',
            'Finish': 'إنهاء',
            'Next': 'التالي',
            'new registeration': 'تسجيل جديد',
            'have an account ?': 'هل لديك حساب؟',
            'edit booking times': 'تعديل أوقات الحجز',
            'Deal Created': 'تم إنشاء العرض',
            'log in': 'تسجيل الدخول',
            'When would you like to pay for the service?': 'متى تريد دفع الخدمة؟',
            'You can either pay now or pay locally on arrival. You will be able to select payment method in the next step.': 'يمكنك دفع الآن أو دفع عند الوصول. ستكون قادرا على اختيار طريقة الدفع في الخطوة التالية.',
            'credit card': 'بطاقة ائتمان',
            'Deposit amount :': 'العربون :',
            'edit deal details': 'تعديل تفاصيل العرض',
            'share': 'مشاركة',
            'Copied !': 'تم النسخ !',
            'open time': 'وقت الفتح',
            'close time': 'وقت الإغلاق',
            'register': 'تسجيل',
            'The given data was invalid.': 'تم إدخال بيانات غير صحيحة.',
            'Your order has been booked successfully': 'تم حجز طلبك بنجاح.',
            'price x quantity': 'السعر x الكمية',
            'remaining amount': 'المبلغ المتبقي',
            'Eash service must have an employee': 'كل خدمة يجب أن تحتوي علي موظف',
            'book & print': 'حجز و طباعة',
            'Please add Unit': 'يرجى إضافة وحدة',
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
