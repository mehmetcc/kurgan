import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";
import React, { useCallback, useEffect, useState } from "react";
import Main from "./src/screens/Main";
import LocationProvider from './src/context/LocationContext';
import { LocationObject } from 'expo-location';

const App = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await loadResourcesAsync();
        await handleFinishLoading(setLoadingComplete);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoadingComplete(true);
      }
    };

    load();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      await SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Main />
  );
};

const loadResourcesAsync = async () => {
  await Promise.all([Font.loadAsync({})]);
};

const handleFinishLoading = async (
  setLoadingComplete: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoadingComplete(true);
};

export default App;
