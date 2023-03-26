import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AccelerationChip from "../components/AccelerationChip/AccelerationChip";
import LocalMap from "../components/LocalMap/LocalMap";
import AnimatedButton from "../utils/AnimatedButton";
import Center from "../utils/Center";

type Props = {
  initialLocation: LocationObject;
};

const Main: React.FC<Props> = ({ initialLocation }: Props) => {
  const [active, setActive] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [location, setLocation] = useState<LocationObject>(initialLocation);
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
          <AnimatedButton
            style={styles.animatedButton}
            width={256}
            height={256}
            loop={true}
            status={active}
            onPress={() => {
              setActive(!active);
            }}
            source={require("../../assets/animations/button.json")}
          />
          <AccelerationChip
            style={styles.materialChipWithImage}
            active={active}
            location={location}
          />
        </Center>
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
  animatedButton: {
    top: 648,
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
