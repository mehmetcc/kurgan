import { SafeAreaView, StyleSheet, Text } from "react-native";

interface Acceleration {
  x: number;
  y: number;
  z: number;
}

const Accelerations: React.FC<Acceleration> = (acceleration: Acceleration) => {
  return (
    <SafeAreaView>
      <Text style={styles.textstyle}>
        {acceleration
          ? `Coordinates: (${acceleration.x}, ${acceleration.y}, ${acceleration.z})`
          : "Press start to send some data!"}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textstyle: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default Accelerations;
