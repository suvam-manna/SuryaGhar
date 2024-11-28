import { useState } from "react";
import dataContext from "./dataContext.js";

function DataContextProvider({ children }) {
    const [data, setData] = useState({
        image: "",
        roofTopArea: 0,
        power: 0,
    });

    console.log("DataContext Provider:", data); // Debugging log

    return (
        <dataContext.Provider value={{ data, setData }}>
            {children}
        </dataContext.Provider>
    );
}

export default DataContextProvider;
