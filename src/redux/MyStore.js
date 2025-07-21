const {configureStore} = require("@reduxjs/toolkit");

import AuthReducer from "./AuthSlice"
import LocationReducer from "./LocationSlice";
import CartReducer from './CartSlice';
const Mystore = configureStore({
    reducer:{
        auth:AuthReducer,
        location:LocationReducer,
        cart:CartReducer
    }
});

export default Mystore