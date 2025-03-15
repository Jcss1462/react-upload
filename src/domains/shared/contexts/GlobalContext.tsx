import React, { createContext, useState, ReactNode, useContext } from "react";

// Definir la interfaz del estado global
interface GlobalContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Crear el contexto
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// El proveedor del contexto que envolverá toda la aplicación
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ isLoading, setIsLoading}}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook para acceder al contexto de forma sencilla
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
  };