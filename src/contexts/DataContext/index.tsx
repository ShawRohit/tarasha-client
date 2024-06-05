// WorkContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_ENDPOINT } from '../../utils/constant';
import { DataContextType} from './type';
import { GlobalProps, SiteData } from '../../utils/type';
import dataloaded from '../../assets/data.json';
const DataContext = createContext<DataContextType>({
  data: {},
  setData: () => { }
});

export const DataProvider: React.FC<GlobalProps> = ({ children }) => {
  const [data, setData] = useState<SiteData>(dataloaded["site-data"]);

  useEffect(() => {
    // const updateData = async () => {
    //   try {
    //     // const response = await fetch(API_ENDPOINT.SITE_DATA);
    //     // const response = await fetch(data_endpoint);
    //     // console.log(response)
    //     // const data = await response.json();
    //     //  console.log(response, data)
    //     // console.log(data)
    //     // setData(data[`site-data`]);
    //     setData(data);
    //   } catch (error) {
    //     console.error('Error fetching work data:', error);
    //   }
    // };
    // updateData();
    // setData(data);
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a WorkProvider');
  }
  return context;
};
