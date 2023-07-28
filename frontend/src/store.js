import {configureStore} from "@reduxjs/toolkit"
import {apiSlice} from "./slices/apiSlice.js"
import authReducer from "./slices/authSlice.js"

const store = configureStore({
	reducer: {
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
})

export default store
