import * as Location from "expo-location";
import { LocationObject } from 'expo-location';
import { createContext, useContext, useEffect, useState } from 'react';

const LocationContext = createContext<LocationContextType>({
    location: undefined,
    refresh: null,
    error: "",
    loading: false,
});

const LocationProvider: React.FC<React.ReactNode> = ({children}) => {
    const [location, setLocation] = useState<LocationObject>();
    const [error, setError] = useState("");
    const [permissions, setPermissions] = useState<Location.PermissionResponse>();
    const [loading, setLoading] = useState<boolean>(false);

    const checkPermissions = async () => {
        if (permissions && permissions.status === "granted") return;

        const permissionResponse = await Location.requestBackgroundPermissionsAsync();
        setPermissions(permissionResponse);

        if (permissionResponse.status !== "granted") {
            setError("Permission to access location was denied");
        }
    };

    const refresh = async () => {
        try {
            setLoading(true);
            checkPermissions();
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
    }, []);

    const locationContextValue = { location, refresh, error, loading };

    return <LocationContext.Provider value={locationContextValue} {...children} />;
};

const useLocation = () => useContext(LocationContext);

export default { LocationProvider, useLocation };

