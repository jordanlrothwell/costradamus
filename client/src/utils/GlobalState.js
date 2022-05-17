import React, { createContext, useContext } from "react";
import { useMatterReducer } from "./reducers";

const MatterContext = createContext();
const { Provider } = MatterContext;

// provider for drag and drop
const MatterProvider = ({ children }) => {
    const [state, dispatch] = useMatterReducer();
    return <Provider value={[state, dispatch]}>{children}</Provider>;
}

const useMatterContext = () => {
  return useContext(MatterContext);
};

export { MatterProvider, useMatterContext };
