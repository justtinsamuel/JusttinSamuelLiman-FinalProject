import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slices/coursesSlice";
import enrollmentReducer from "./slices/enrollmentsSlice";
import checkpointReducer from "./slices/checkpointsSlice";
import moduleReducer from "./slices/modulesSlice";
import submissionReducer from "./slices/submissionsSlice";
import userReducer from "./slices/usersSlice";
// import authReducer from "./slices/authSlice"; // sementara skip

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    enrollments: enrollmentReducer,
    checkpoints: checkpointReducer,
    modules: moduleReducer,
    submissions: submissionReducer,
    users: userReducer,
    // auth: authReducer,
  },
});
