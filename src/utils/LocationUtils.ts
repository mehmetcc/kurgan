import { LocationObject } from "expo-location";

const createEmptyLocation = (): LocationObject => {
  return {
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: 0,
  };
};

export default createEmptyLocation;
