import { useState } from "react";
import dataContext from "./dataContext.js";

function DataContextProvider({ children }) {
    const [data, setData] = useState({});

    return (
        <dataContext.Provider value={{data, setData}}>
            {children}
        </dataContext.Provider>
    );
}

export default DataContextProvider;
