import React from "react";
import { useContext } from "react";

export const MatterContext = React.createContext();

export const useMatterContext = () => useContext(MatterContext);

export const MatterProvider = ({ children }) => {
  const [matter, setMatter] = React.useState({
    id: 1,
    name: "Test Matter",
    description: "This is a test matter",
    created_at: "2020-01-01T00:00:00.000Z",
    updated_at: "2020-01-01T00:00:00.000Z"
});

  const updateMatter = (matter) => {
    setMatter(matter);
  };

  return (
    <MatterContext.Provider value={{ matter, updateMatter }}>
      {children}
    </MatterContext.Provider>
  );
}
