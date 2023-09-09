
export const getTimeToday  = () => {
    const current = new Date();
    return new Date(current.getFullYear(), current.getMonth(), current.getDate())
}