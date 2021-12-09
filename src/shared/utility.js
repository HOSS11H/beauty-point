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
