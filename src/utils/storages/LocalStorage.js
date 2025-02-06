const SaveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const GetFromLocalStorage = (key) => {

    return JSON.parse(localStorage.getItem(key));
};

const RemoveFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}


export { SaveToLocalStorage, GetFromLocalStorage, RemoveFromLocalStorage };