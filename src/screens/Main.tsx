import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AccelerationChip from "../components/AccelerationChip/AccelerationChip";
import LocalMap from "../components/LocalMap/LocalMap";
import Center from "../utils/Center";
import createEmptyLocation from "../utils/LocationUtils";

const Main = () => {
  const [active, setActive] = useState(false);
  const [location, setLocation] = useState<LocationObject>(
    createEmptyLocation()
  );
  const [locationErrorMessage, setLocationErrorMessage] = useState<
    // try to find a way to utilize this information
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
  }, [location]);

  return (
    <View style={styles.container}>
      <View style={styles.materialMapViewStack}>
        <LocalMap style={styles.materialMapView} location={location} />
        <Center horizontal>
          <TouchableOpacity
            onPress={() => setActive(!active)}
            style={styles.button}
          ></TouchableOpacity>
        </Center>
        <AccelerationChip
          style={styles.materialChipWithImage}
          active={active}
          location={location}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  materialMapView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    top: 652,
    width: 100,
    height: 100,
    position: "absolute",
    backgroundColor: "rgba(233,30,99,1)",
    borderRadius: 100,
  },
  materialChipWithImage: {
    width: 301,
    height: 32,
    position: "absolute",
    top: 49,
    left: 37,
  },
  materialMapViewStack: {
    flex: 1,
  },
});

export default Main;
