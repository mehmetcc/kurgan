import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default function AnimatedButton({
  onPress = () => {},
  onChange = () => {},
  status = false,
  width = 48,
  containerStyle,
  source = require("../../assets/animations/button.json"),
  ...props
}) {
  const [isActive, setIsActive] = useState(status);
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    if (isActive) {
      animation?.play();
    } else animation?.reset();
  }, [isActive, animation]);

  useEffect(() => {
    setIsActive(status);
  }, [status]);

  const toggleStatus = () => {
    if (onChange) onChange(!isActive);
    setIsActive(!isActive);
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => {
          onPress();
          toggleStatus();
        }}
        {...props}
      >
        <LottieView
          autoPlay={false}
          loop={true}
          resizeMode="contain"
          style={{ width }}
          ref={(animation) => setAnimation(animation)}
          source={source}
        />
      </TouchableOpacity>
    </View>
  );
}

AnimatedButton.propTypes = {
  onChange: PropTypes.func,
  containerStyle: PropTypes.object,
  status: PropTypes.bool,
  width: PropTypes.number,
};

AnimatedButton.defaultProps = {
  status: false,
  onChange: null,
  width: 60,
  containerStyle: null,
};
