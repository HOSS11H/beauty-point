import { useEffect, useReducer } from "react";
import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";


const TOUR_STEPS = [
    {
        target: "#settings",
        content: 'Welcome to the settings page. Here you can change your account settings.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#general-settings",
        content: 'Here you can change your account settings.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#vendor-settings",
        content: 'Here you can change your vendor page settings.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#booking-settings",
        content: 'Here you can change your booking settings.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#roles-settings",
        content: 'Here you can change your roles settings.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#units",
        content: 'Here you can add your units.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#employees",
        content: 'Here you can add your employees.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#products",
        content: 'Here you can add your products.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#services",
        content: 'Here you can add your services.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#deals",
        content: 'Here you can add your deals.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#point-of-sale",
        content: 'Here you can add your bookings.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#bookings",
        content: 'Here you can view your bookings.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#reports",
        content: 'Here you can view your reports.',
        spotlightClicks: true,
        title: 'Menu',
        disableBeacon: true,
        disableOverlayClose: true,
        hideCloseButton: true,
        placement: "left-end",
    },
    {
        target: "#menu-button",
        content: 'Here you can view your menu.',
        spotlightClicks: true,
        title: 'Menu',
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