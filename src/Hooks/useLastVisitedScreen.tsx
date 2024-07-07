// useLastVisitedScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const LAST_VISITED_SCREEN_KEY = 'LAST_VISITED_SCREEN';

export const useLastVisitedScreen = () => {
  const [lastVisitedScreen, setLastVisitedScreen] = useState('LoginScreen');

  useEffect(() => {
    const getLastVisitedScreen = async () => {
      try {
        const screen = await AsyncStorage.getItem(LAST_VISITED_SCREEN_KEY);
        if (screen) {
          setLastVisitedScreen(screen);
        }
      } catch (error) {
        console.error('Failed to load last visited screen', error);
      }
    };

    getLastVisitedScreen();
  }, []);

  const updateLastVisitedScreen = async (screen:any) => {
    try {
      await AsyncStorage.setItem(LAST_VISITED_SCREEN_KEY, screen);
    } catch (error) {
      console.error('Failed to update last visited screen', error);
    }
  };

  return { lastVisitedScreen, updateLastVisitedScreen };
};
