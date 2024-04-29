export function parseError({ error }) {
    let newError = {}
    let pathArray = []
    if (error.response.status !== 401) {
        for (let item of error.response.data.message) {
            if (Array.isArray(item.path) && item.path.length > 1) {
                pathArray.push(item.path[1])
            }
            newError[item.path] = item.message
        }
        if (pathArray.length > 0) {
            let newMessage = `pages[${pathArray.toString()}] must be a valid url`
            newError["pages"] = newMessage
        }
    } else {
        newError = {
            unauthorized: "You don't have authorization for this action"
        }
    }
    return {newError} 
}

export function parseDataFromForm(e) {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target))
    return { data }
}

export function debounce({ callback, data, time, timerId, setTimerId }) {
    //esto limpia el settimeout anterior si se vuelve a ejecutar si no se ejecuta se ejecuta el settimeout que estaba
    clearTimeout(timerId);
    setTimerId(setTimeout(() => {
        callback(data);
    }, time))
}
export function parsePagesArray(numberOfPages) {
    let pages = []
    if (numberOfPages !== 0) {
        for (let index = 0; index < numberOfPages; index++) {
            pages.push(index + 1)
        }
        return pages;
    }
    return [1];
}
export function parseDiscountPercentage(percentage) {
    return ((1 - percentage) * 100).toFixed()  
}
export function parseDiscountPrice(price,percentage){
    return price * percentage
}
export function parsePrice(price){
    return Intl.NumberFormat("de-DE").format(price)
}
export function parseDate(date){
    let newDate = new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    return newDate
}