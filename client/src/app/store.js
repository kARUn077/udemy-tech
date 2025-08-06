import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { userApi } from "@/features/api/userApi"; // Add this import

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) => 
    defaultMiddleware()
      .concat(authApi.middleware)
      .concat(courseApi.middleware)
      .concat(purchaseApi.middleware)
      .concat(courseProgressApi.middleware)
      .concat(userApi.middleware) // Add this line
});

const initializeApp = async () => {
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch: true}));
};
initializeApp();