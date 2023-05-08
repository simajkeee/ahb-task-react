import React, { createContext, useState } from "react";

export const CsvContext = createContext();

export const CsvProvider = ({ children }) => {
  const [parsedRows, setParsedRows] = useState([]);

  const updateParsedRows = (newRows) => {
    setParsedRows(newRows);
  };

  return (
    <CsvContext.Provider value={{ parsedRows, updateParsedRows }}>
      {children}
    </CsvContext.Provider>
  );
};
