import { LocationObject } from "expo-location";
import React from "react";
import { StyleSheet, View } from "react-native";
import ViewMap, { Marker } from "react-native-maps";

type Props = {
  location: LocationObject;
  style?: {};
};

const LocalMap = ({ style, location }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <ViewMap
        style={styles.mapView}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
        />
      </ViewMap>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  mapView: {
    flex: 1,
    backgroundColor: "rgb(230,230,230)",
  },
});

export default LocalMap;
