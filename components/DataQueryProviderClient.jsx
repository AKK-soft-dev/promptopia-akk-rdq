"use client";

import { DataQueryProvider } from "react-data-query";

const DataQueryProviderClient = ({ children }) => {
  return <DataQueryProvider>{children}</DataQueryProvider>;
};

export default DataQueryProviderClient;
