import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./Page/authuication/LoginPage/LoginPage";
import SignupPage from "./Page/authuication/SignupPage/SignupPage";
import HomePage from "./Page/homePage/HomePage";
import VerificationPage from "./Page/authuication/verificationPage/verificationPage";
import PostJob from "./components/AdminDashboard/outlet/postJob/PostJob";
import JobList from "./components/AdminDashboard/outlet/myJob/MyJobList";
import Applicant from "./components/AdminDashboard/outlet/applicant/Applicant";
import RightPartDashboard from "./components/AdminDashboard/outlet/rightPartDashboard/RightPartDashboard";
import { useAuth } from "./contexApi/authContext";
import ProfileAdmin from "./components/AdminDashboard/Profile/ProfileAdmin";
import { SendEmailPage } from "./Page/authuication/forgotPassword/SendEmailPage";
import { ChangePasswordPage } from "./Page/authuication/forgotPassword/ChangePasswordPage";
import SingleJob from "./components/AdminDashboard/outlet/allJob/singleJob/singleJob";
import AllJobs from "./components/AdminDashboard/outlet/allJob/AllJob";
import NotFoundPage from "./Page/error/notFoundPage";
import AdminDashboard from "./components/AdminDashboard/AdminDashbaord";
import UserDashboard from "./components/UserDasboard/UserDashboard";
import UserProfile from "./components/UserDasboard/userProfile/userProfile";
import JobsCardsUserSide from "./components/UserDasboard/outlet/card/JobCards";
import JobCardSingle from "./components/UserDasboard/outlet/card/singlePage/SingleJobCard";
import UserDashboardContainer from "./components/UserDasboard/outlet/UserDasbboardContainer";
import { MyUserJob } from "./components/UserDasboard/outlet/myjob/MyUserJob";
import SingleBlogCard from "./Page/Blog/blog/pages/SingleBlogCard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verification"
          element={
            <SignupPrivateRoute>
              <VerificationPage />
            </SignupPrivateRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <SendEmailPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verification-otp"
          element={
            <PublicRoute>
              <ChangePasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PublicRoute>
              <SingleBlogCard />
            </PublicRoute>
          }
        />{" "}
        {/* Add First route */}
        {/* adminDashboard Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<RightPartDashboard />} />
          <Route path="postJob/:id?" element={<PostJob />} />
          <Route path="myJobs" element={<JobList />} />
          <Route path="allJobs" element={<AllJobs />} />
          <Route path="single-job/:id" element={<SingleJob />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="applicant/:id" element={<Applicant />} />
        </Route>
        {/* userDashboard Routes */}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<UserDashboardContainer />} />

          <Route path="apply-job/:id" element={<JobCardSingle />} />
          <Route path="userprofile" element={<UserProfile />} />
          <Route path="userMyJob" element={<MyUserJob />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children, role }) => {
  const { isLogged, loading, usersData } = useAuth();

  if (loading)
    return (
      <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
        <div>
          <h1 class="text-xl md:text-7xl font-bold flex items-center">
            L
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              class="animate-spin"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
            </svg>{" "}
            ading . . .
          </h1>
        </div>
      </div>
    );

  if (isLogged) {
    if (role && usersData?.role !== role) {
      return (
        <Navigate
          to={role === "admin" ? "/user/dashboard" : "/admin/dashboard"}
        />
      );
    }
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

// eslint-disable-next-line react/prop-types
export const PublicRoute = ({ children }) => {
  const { isLogged, loading, usersData } = useAuth();

  if (loading)
    return (
      <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
        <div>
          <h1 class="text-xl md:text-7xl font-bold flex items-center">
            L
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              class="animate-spin"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
            </svg>{" "}
            ading . . .
          </h1>
        </div>
      </div>
    );

  if (isLogged) {
    if (usersData?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  } else {
    return children;
  }
};

// eslint-disable-next-line react/prop-types
export const SignupPrivateRoute = ({ children }) => {
  const { signupToken, loading } = useAuth();

  if (loading)
    return (
      <div class="flex items-center justify-center w-full h-[100vh] text-gray-900 dark:text-gray-100 dark:bg-gray-950">
        <div>
          <h1 class="text-xl md:text-7xl font-bold flex items-center">
            L
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              class="animate-spin"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
            </svg>{" "}
            ading . . .
          </h1>
        </div>
      </div>
    );

  if (signupToken) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
