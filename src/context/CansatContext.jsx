import React, { createContext, useContext } from 'react';
import { useCansatData } from '../hooks/useCansatData';

const CansatContext = createContext();

/**
 * Provider para el contexto del CanSat
 */
export const CansatProvider = ({ children, serverUrl }) => {
  const cansatData = useCansatData(serverUrl);

  return (
    <CansatContext.Provider value={cansatData}>
      {children}
    </CansatContext.Provider>
  );
};

/**
 * Hook para usar el contexto del CanSat
 */
export const useCansatContext = () => {
  const context = useContext(CansatContext);
  if (!context) {
    throw new Error('useCansatContext debe ser usado dentro de un CansatProvider');
  }
  return context;
};

export default CansatContext;
