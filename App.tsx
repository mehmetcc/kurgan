import { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Accelerations from "./components/Accelerations";
import Buttons from "./components/Buttons";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import LocationErrorModal from "./screens/LocationErrorModal";

export default function App() {
  const [active, setActive] = useState(false);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationErrorMessage, setLocationErrorMessage] = useState<
    string | null
  >(null);

  const getLocation = async () => {
    let { status } = await Location.getBackgroundPermissionsAsync();

    if (status !== "granted") {
      setLocationErrorMessage("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Accelerations active={active} location={location} />
      <Buttons active={active} setActive={setActive} />
      <LocationErrorModal errorMessage={locationErrorMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
