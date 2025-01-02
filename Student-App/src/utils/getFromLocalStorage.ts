const retrieveData = (storageKey: string) => {
    const data: any = localStorage.getItem(storageKey);
    if(data) {
        try {
            return JSON.parse(data)
        }
        catch {
            return data;
        }
    }
    else {
        return null;
    }
} 
export default retrieveData;