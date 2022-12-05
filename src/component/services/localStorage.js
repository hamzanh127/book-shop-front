export function removeItem(itemToRemove){
    window.localStorage.clear(itemToRemove)

}

export function getItem(item){
    window.localStorage.getItem(item)

}

export function setItem(localStorageName,item){
    window.localStorage.setItem(localStorageName, item)

}