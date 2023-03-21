import { LocationObject } from "expo-location";
import { Subscription } from "expo-modules-core";
import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

type Props = {
  active: boolean;
  location: LocationObject;
  style?: {};
};

const AccelerationChip: React.FC<Props> = ({
  active,
  location,
  style,
}: Props) => {
  const [{ x, y, z }, setAcceleration] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const subscribe = () => {
    Accelerometer.setUpdateInterval(1000);
    setSubscription(Accelerometer.addListener(setAcceleration));
  };

  const unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  if (active) {
    // TODO change when integrating server endpoint
    console.log(
      `Coordinates: ${x}, ${y}, ${z} Longitude: ${location.coords.longitude} Latitude: ${location.coords.latitude} `
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../../assets/images/chipImage.jpg")}
        style={styles.leftImage}
      ></Image>
      <Text style={styles.chipText}>
        {active
          ? "Veriler gönderiliyor!"
          : "Gönderimi başlatmak için bir tuşa basın!"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(230,230,230)",
    borderRadius: 50,
    flexDirection: "row",
  },
  leftImage: {
    height: 32,
    width: 32,
    backgroundColor: "#CCC",
    borderRadius: 16,
  },
  chipText: {
    fontSize: 13,
    color: "rgba(0,0,0,0.87)",
    paddingLeft: 8,
    paddingRight: 12,
  },
});

export default AccelerationChip;
