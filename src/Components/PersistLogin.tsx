import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import useRefreshToken from "../Hooks/useRefreshToken";
import { useAuth } from "../Hooks/useAuth";
import { useAppContext } from "../Hooks/useAppContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


const PersistLogin = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const { state ,setState} = useAppContext();


  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!auth?.accessToken && state.persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const fetchValue = async () => {
      const storedValue = await AsyncStorage.getItem('persist');
      if (storedValue) {
        setState(prevState => ({
          ...prevState,
          persist: JSON.parse(storedValue),
        }));
      }
    };

    fetchValue();
  }, []);

  if (!state.persist) {
    return children;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};

export default PersistLogin;
