export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject,
    }
}
const formatter = new Intl.NumberFormat('en-IN', {
    style: "currency",
    currency: "SAR",
})

export function formatCurrency(amount) {
    return formatter.format(amount)
}

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12' ) {
        hours = '00';
    }

    if (modifier === 'PM' || modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}
