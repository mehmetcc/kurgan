import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationObject } from "expo-location";
import createEmptyLocation from "../utils/LocationUtils";

interface LocationState {
    value: LocationObject
};

const initialState: LocationState = {
    value: createEmptyLocation(),
};

export const locationSlice = createSlice({
    name: "Location-Slice",
    initialState,
    reducers: {
        update: (currentState: LocationState, action: PayloadAction<LocationObject>) => {
            currentState.value = action.payload;
        }
    }
});

export const {update} = locationSlice.actions;

export default locationSlice.reducer;