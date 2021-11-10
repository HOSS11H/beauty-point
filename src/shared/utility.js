export const updateObject = ( oldObject , updatedObject ) => {
    return {
        ...oldObject,
        ...updatedObject,
    }
}
const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD"
})

export  function formatCurrency(amount) {
    return formatter.format(amount)
}
