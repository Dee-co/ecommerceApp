const {createSlice} = require('@reduxjs/toolkit');
const LocationSlice = createSlice({
    name: 'location',
    initialState: {
        currentLocation: null,
        selectedLocation: null,
    },
    reducers: {
        setCurrentLocation(state, action) {
            state.currentLocation = action.payload;
        },
        setSelectedLocation(state, action) {
            state.selectedLocation = action.payload;
        },
        clearSelectedLocation(state) {
            state.selectedLocation = null;
        },
    },
});
export const { setCurrentLocation, setSelectedLocation, clearSelectedLocation } = LocationSlice.actions;
export default LocationSlice.reducer;