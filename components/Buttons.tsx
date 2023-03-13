import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

const Buttons = () => {
  const [active, setActive] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setActive(!active)}
      >
        <Text>{active ? "Stop!" : "Start!"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});

export default Buttons;
