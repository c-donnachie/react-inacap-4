import React, { createContext, useContext, useState } from 'react';

const SelectedDataContext = createContext();

export const SelectedDataProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState(null);

  return (
    <SelectedDataContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </SelectedDataContext.Provider>
  );
};

export const useSelectedData = () => useContext(SelectedDataContext);
