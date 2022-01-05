export const updateObject = ( oldObject , updatedObject ) => {
    return {
        ...oldObject,
        ...updatedObject,
    }
}
const formatter = new Intl.NumberFormat('en-IN', {
    style: "currency",
    currency: "SAR",
})

export  function formatCurrency(amount) {
    return formatter.format(amount)
}

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
