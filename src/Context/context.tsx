import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";


interface AppState {
  Journals: any[];  
}
interface AppContextType {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
}

export const AppContext = createContext<AppContextType>({
  state: { Journals: []},
  setState: () => null,
});
interface MyComponentProps {
  children: ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    Journals: [], 
  });
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
