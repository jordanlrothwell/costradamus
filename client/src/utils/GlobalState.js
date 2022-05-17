import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers'

const UserContext = createContext();
const { Provider } = UserContext;

const UserProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    matters: [],
    costs: [],
    currentMatter: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
