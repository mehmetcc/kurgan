import * as Font from "expo-font";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, useCallback, useEffect, useState } from "react";
import AnimatedLoader from "react-native-animated-loader";
import { Text, View, StyleSheet } from "react-native";
import Main from "./src/screens/Main";
import Center from "./src/utils/Center";
import createEmptyLocation from "./src/utils/LocationUtils";

const App = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [loadingText, setLoadingText] = useState("Uygulama yükleniyor!");
  const [location, setLocation] = useState<LocationObject>(createEmptyLocation());
  const [locationErrorMessage, setLocationErrorMessage] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        await loadResourcesAsync();
        await loadInitialLocation(setLocation, setLocationErrorMessage);
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
    return (
      <AnimatedLoader
        visible={!isLoadingComplete}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
        source={require("./assets/animations/loading.json")}
      >
        <Text>{loadingText}</Text>
      </AnimatedLoader>
    );
  }

  return <Main initialLocation={location} />;
};

const styles = StyleSheet.create({
  lottie: {
    width: 256,
    height: 256,
  },
});

const loadResourcesAsync = async () => {
  await Promise.all([Font.loadAsync({})]);
};

const handleFinishLoading = async (
  setLoadingComplete: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoadingComplete(true);
};

const loadInitialLocation = async (
  setLocation: React.Dispatch<React.SetStateAction<LocationObject>>,
  setLocationErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  let { status } = await Location.getBackgroundPermissionsAsync();

  if (status !== "granted") {
    setLocationErrorMessage("Permission to access location was denied");
  }

  let location = await Location.getCurrentPositionAsync({});
  setLocation(location);
};

export default App;
