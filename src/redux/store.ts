import { configureStore } from "@reduxjs/toolkit";
import brandSlice from "./slices/brandSlice";
const store = configureStore({
  reducer: {
    brandCrud: brandSlice,
  },
});
export default store;
