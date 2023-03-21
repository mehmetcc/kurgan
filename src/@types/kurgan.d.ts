interface LocationContextType {
    location?: Location.LocationData;
    refresh: () => void;
    error: string;
    loading: boolean;
  }
  