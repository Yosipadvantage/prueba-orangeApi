import { createContext, useState } from "react";


const contextTheme: any = createContext(false)



const ProviderTheme = ({ children }: any) => {

    const [stateTheme, setStateTheme] = useState(false);

    return (
        <contextTheme.Provider value={{ stateTheme, setStateTheme }}>
            {children}
        </contextTheme.Provider>

    );

}

export { ProviderTheme, contextTheme };