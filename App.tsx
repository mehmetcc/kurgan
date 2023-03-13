import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Accelerations from "./components/Accelerations";
import Buttons from "./components/Buttons";

export default function App() {
  const [active, setActive] = useState(false);

  return (
    <View style={styles.container}>
      <Accelerations x={0} y={0} z={0} />
      <Buttons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
