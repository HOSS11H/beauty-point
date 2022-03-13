import { useEffect, useReducer } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";


const TOUR_STEPS = [
    {
        target: "#settings",
        content: 'مرحباً بك في صفحة الأعدادات هنا يمكنك تغيير اعدادات النظام',
        spotlightClicks: true,
        title: 'الأعدادات',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#general-settings",
        content: 'يمكنك هنا تغيير الأعدادات العامة للنظام',
        spotlightClicks: true,
        title: 'الأعدادات العامة',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#vendor-settings",
        content: 'هنا يمكنك تغيير اعدادات صفحة البائع التي ستظهر للعملاء',
        spotlightClicks: true,
        title: 'صفحة البائع',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#booking-settings",
        content: 'حدد مواعيد الفتح والأغلاق للصالون من هنا',
        spotlightClicks: true,
        title: 'مواعيد الحجز',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#roles-settings",
        content: 'هنا يمكنك تغيير الادوار والاذونات للموظفين',
        spotlightClicks: true,
        title: 'الأدوار والأذونات',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#units",
        content: 'هنا يمكنك اضافة الوحدات لأدارة المخزون',
        spotlightClicks: true,
        title: 'الوحدات',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#employees",
        content: 'يمكنك اضافة الموظفين من هنا',
        spotlightClicks: true,
        title: 'الموظفين',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#products",
        content: 'يمكنك اضافة المنتجات من هنا اللتي تستطيع بيعها منفردة او التي تستخدم في تنفيذ خدمة',
        spotlightClicks: true,
        title: 'المنتجات',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#services",
        content: 'يمكنك اضافة الخدمات من هنا مثل الأستشوار والى آخره',
        spotlightClicks: true,
        title: 'الخدمات',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#deals",
        content: 'يمكنك عمل عروض على الخدمات من هنا',
        spotlightClicks: true,
        title: 'العروض',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#point-of-sale",
        content: 'نقطة البيع التي من خلالها يمكنك إنشاء الحجوزات',
        spotlightClicks: true,
        title: 'نقطة البيع',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#bookings",
        content: 'يمكن ادارة الحجوزات من هنا التي تم انشاءها سواء من داخل الصالون او من الموقع',
        spotlightClicks: true,
        title: 'الحجوزات',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#reports",
        content: 'يمكنك رؤية التقارير ومتابعة سير العمل وطباعة التقارير من هنا',
        spotlightClicks: true,
        title: 'التقارير',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#menu-button",
        content: 'يمكنك عرض القائمة بشكل كلي او جزئي من هنا',
        spotlightClicks: true,
        title: 'القائمة',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "bottom-end",
    },
];

const INITIAL_STATE = {
    run: true,
    continuous: true,
    loading: false,
    stepIndex: 0, // Make the component controlled
    steps: TOUR_STEPS,
    key: new Date(), // This field makes the tour to re-render when the tour is restarted
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // start the tour
        case "START":
            return { ...state, run: true };
        // Reset to 0th step
        case "RESET":
            return { ...state, stepIndex: 0 };
        // Stop the tour
        case "STOP":
            return { ...state, run: false };
        // Update the steps for next / back button click
        case "NEXT_OR_PREV":
            return { ...state, ...action.payload };
        // Restart the tour - reset go to 1st step, restart create new tour
        case "RESTART":
            return {
                ...state,
                stepIndex: 0,
                run: true,
                loading: false,
                key: new Date()
            };
        default:
            return state;
    }
};

const Tour = props => {

    const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        dispatch({ type: "START" });
    }, []);

    const callback = (data) => {
        const { action, index, type, status } = data;
        if (
            action === ACTIONS.CLOSE ||
            (status === STATUS.SKIPPED && tourState.run) ||
            status === STATUS.FINISHED
        ) {
            dispatch({ type: "STOP" });
        } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
            dispatch({
                type: "NEXT_OR_PREV",
                payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
            });
        }
    };

    const startTour = () => {
        dispatch({ type: "RESTART" });
    };

    return <JoyRide
        {...tourState}
        callback={callback}
        showSkipButton={true}
        scrollToFirstStep={true}
        styles={{
            tooltipContainer: {
                textAlign: "left"
            },
            buttonNext: {
                backgroundColor: "green"
            },
            buttonBack: {
                marginRight: 10
            },
            options: {
                zIndex: 10000,
            },
        }}
        locale={{
            last: "End tour",
            skip: "Close tour"
        }} />
}
export default Tour;
