import React, { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  Journals: any[];
  persist: any;
}

interface AppContextType {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
}

export const AppContext = createContext<AppContextType>({
  state: { Journals: [], persist: null },
  setState: () => null,
});

interface MyComponentProps {
  children: ReactNode;
}

export const MyComponent: React.FC<MyComponentProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({ Journals: [], persist: null });

  // Load the persisted state on component mount
  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const persistedValue = await AsyncStorage.getItem("persist");
        if (persistedValue !== null) {
          setState(prevState => ({ ...prevState, persist: JSON.parse(persistedValue) }));
        }
      } catch (error) {
        console.error("Failed to load persisted state", error);
      }
    };

    loadPersistedState();
  }, []);

  // Update the persisted state whenever it changes
  useEffect(() => {
    const persistState = async () => {
      try {
        await AsyncStorage.setItem("persist", JSON.stringify(state.persist));
      } catch (error) {
        console.error("Failed to persist state", error);
      }
    };

    if (state.persist !== null) {
      persistState();
    }
  }, [state.persist]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
