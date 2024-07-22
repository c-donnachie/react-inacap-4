import React, { createContext, useContext, useState } from 'react';

const SelectedDataContext = createContext();

export const SelectedDataProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <SelectedDataContext.Provider value={{ selectedData, setSelectedData, selectedId, setSelectedId }}>
      {children}
    </SelectedDataContext.Provider>
  );
};

export const useSelectedData = () => useContext(SelectedDataContext);
