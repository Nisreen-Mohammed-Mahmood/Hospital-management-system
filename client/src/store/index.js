import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import appointmentsReducer from "../features/appointmentSlice";
import doctorsReducer from "../features/doctorSlice";
import doctorsSpecializationReducer from "../features/doctorSpecializationSlice";
import billingReducer from "../features/billingSlice";
import patientReducer from "../features/patientSlice";

// Persist configurations for both auth and user reducers
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};
const appointmentsPersistConfig = {
  key: "appointments",
  storage,
};
const doctorsPersistConfig = {
  key: "doctors",
  storage,
};
const doctorsSpecializationPersistConfig = {
  key: "doctorsSpecializations",
  storage,
};
const billingPersistConfig = {
  key: "billing",
  storage,
};
const patientPersistConfig = {
  key: "patient",
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAppointmentsReducer = persistReducer(
  appointmentsPersistConfig,
  appointmentsReducer
);
const persistedDoctorsReducer = persistReducer(
  doctorsPersistConfig,
  doctorsReducer
);
const persistedDoctorsSpecializationReducer = persistReducer(
  doctorsSpecializationPersistConfig,
  doctorsSpecializationReducer
);
const persistedBillingReducer = persistReducer(
  billingPersistConfig,
  billingReducer
);
const persistedPatientReducer = persistReducer(
  patientPersistConfig,
  patientReducer
);

// Store configuration
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer,
    appointments: persistedAppointmentsReducer,
    doctors: persistedDoctorsReducer,
    doctorsSpecializations: persistedDoctorsSpecializationReducer,
    billing: persistedBillingReducer,
    patients: persistedPatientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor for the store
export const persistor = persistStore(store);
