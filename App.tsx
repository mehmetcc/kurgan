import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Accelerations from "./components/Accelerations";
import Buttons from "./components/Buttons";

export default function App() {
  const [active, setActive] = useState(false);

  return (
    <View style={styles.container}>
      <Accelerations active={active} />
      <Buttons active={active} setActive={setActive} />
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
