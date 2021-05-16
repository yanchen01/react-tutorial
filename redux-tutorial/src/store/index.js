import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import counterReducer from './counter';

// If multiple reducers, can combine with a map
const store = configureStore({
	reducer: { counter: counterReducer, auth: authReducer }
});

// const store = configureStore({
// 	reducer: counterSlice.reducer
// });

export default store;
