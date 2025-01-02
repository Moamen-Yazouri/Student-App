import { useEffect, useState } from "react"
import retrieveData from "../utils/getFromLocalStorage";
import storeData from "../utils/storeOnLocalStorage";

const useLocalStorage = (state: any, storageKey: string) => {
    const[storedData, setStoredData] = useState<any>();

    useEffect(()=>{
        const strData = retrieveData(storageKey);
        setStoredData(strData);
    }, []);

    useEffect(() => {
        storeData(state, storageKey);
    }, [state]);

    return {storedData};
}
export default useLocalStorage; 