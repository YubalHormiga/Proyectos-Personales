export const formatCurrency = price => {
    return Number(price).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}