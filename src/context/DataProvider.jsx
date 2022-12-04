
import { createContext, useContext,useState } from "react"

export const DataContext = createContext(null);




const DataProvider = ({children}) => {
    const [account,setAccount]=useState({username:"",name:""});
    return (
        // pass those in datacontext which u want globally excess
        // component ko wrap around 
        <DataContext.Provider value={{
            account,
            setAccount
        }}>
    
            {children}
        </DataContext.Provider>
    )
}
    export  default DataProvider;