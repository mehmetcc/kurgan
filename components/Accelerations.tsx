import { Subscription } from "expo-modules-core";
import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

type Props = {
  active: boolean;
};

const Accelerations: React.FC<Props> = ({ active }: Props) => {
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
    subscription && subscription.remove();
    setSubscription(null);
  };


  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    }
  }, []);

  if (active) {
    // TODO change when integrating server endpoint
    console.log(x, y, z);
  }

  return (
    <SafeAreaView>
      <Text style={styles.textstyle}>
        {
          active ? "Listening!" : "Press start to send some data!"
        }
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
