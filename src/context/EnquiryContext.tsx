import React, { createContext, useContext, useState } from 'react';

export interface EnquiryData {
  service: string;
  destination?: string;
  travelDate?: string;
  returnDate?: string;
  passengers?: string;
  tripType?: string;
  notes?: string;
}

interface EnquiryContextType {
  isOpen: boolean;
  enquiryData: EnquiryData;
  openEnquiry: (initialData?: Partial<EnquiryData>) => void;
  closeEnquiry: () => void;
}

const defaultEnquiry: EnquiryData = {
  service: 'Sri Lanka Tour',
  destination: '',
  travelDate: '',
  passengers: '2 Travellers',
  notes: ''
};

const EnquiryContext = createContext<EnquiryContextType>({
  isOpen: false,
  enquiryData: defaultEnquiry,
  openEnquiry: () => {},
  closeEnquiry: () => {}
});

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [enquiryData, setEnquiryData] = useState<EnquiryData>(defaultEnquiry);

  const openEnquiry = (initialData?: Partial<EnquiryData>) => {
    setEnquiryData(prev => ({
      ...prev,
      ...initialData
    }));
    setIsOpen(true);
  };

  const closeEnquiry = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryContext.Provider value={{ isOpen, enquiryData, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => useContext(EnquiryContext);
