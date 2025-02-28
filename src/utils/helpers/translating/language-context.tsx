'use client';

import { createContext, useState, useContext } from 'react';

interface LanguageContextProps {
  languageIndex: number;
  updateLanguageIndex: (index: number) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [languageIndex, setLanguageIndex] = useState<number>(0);

  const updateLanguageIndex = (index: number) => {
    setLanguageIndex(index);
  };

  return (
    <LanguageContext.Provider value={{ languageIndex, updateLanguageIndex }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
