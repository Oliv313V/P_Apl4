import {configureStore} from '@reduxjs/toolkit';

import authReducer from "./slices/authSlice.jsx";

import adminReducer from "./slices/adminSlice.jsx";

//import reportReducer from "./slices/reportSlice.jsx";

import productReducer from "./slices/productSlice.jsx";

import productionReducer from "./slices/productionSlice.jsx";




export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        product: productReducer,
        production: productionReducer,

},
});

