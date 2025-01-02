const storeData = (newData: any, storageKey: string) => {
    if(typeof newData === 'object') {
        localStorage.setItem(storageKey, JSON.stringify(newData));
    }
    else {
        localStorage.setItem(storageKey, newData.toString());
    }
}
export default storeData;