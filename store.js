import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});










// chat generatePath...connectDB...


// import { configureStore, createSlice } from '@reduxjs/toolkit';

// // user slice بنائیں
// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     userData: null, // یہاں آپ اپنا initial state رکھ سکتے ہیں
//   },
//   reducers: {
//     setUser(state, action) {
//       state.userData = action.payload;
//     },
//     logout(state) {
//       state.userData = null;
//     },
//   },
// });

// // actions export کریں
// export const { setUser, logout } = userSlice.actions;

// Redux store configure کریں
// export const store = configureStore({
//   reducer: {
//     user: userSlice.reducer,
//   },
// });
