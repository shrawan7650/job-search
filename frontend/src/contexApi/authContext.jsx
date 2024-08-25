import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usersData, setUsersData] = useState(null);
  const [notificationAdmin, setNotificationAdmin] = useState(null);
  const [notificationUser, setNotificationUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" || false
  );
  const [myAppliedJob, setMyAppliedJob] = useState([]);

  const token = Cookies.get("token");
  const signupToken = Cookies.get("signupToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token) {
          setLoading(true);
          const response = await axios.get("/api/users/profile", {
            headers: {
              Authorization: token,
            },
          });
          console.log("profileFetch", response);
          setLoading(false);
          setUsersData(response?.data?.user || []);
          setIsLogged(true);
        } else {
          setIsLogged(false);
          setUsersData(null);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          Cookies.remove("token");
          setIsLogged(false);
          setLoading(false);
          window.location.href = "/login";
        } else {
          console.error("Profile fetch error:", error);
        }
      }
    };
    fetchProfile();
  }, [token]);

  useEffect(() => {
    if (isLogged) {
      const fetchNotificationsAdmin = async () => {
        try {
          const response = await axios.get("/api/job/all-message-job");
          console.log("message2", response);
          setNotificationAdmin(response?.data?.messageData || []);
        } catch (error) {
          console.error("Notification fetch error:", error);
        }
      };

      fetchNotificationsAdmin();
    }
  }, [isLogged, token]);

  useEffect(() => {
    const fetchNotificationsUser = async () => {
      try {
        const response = await axios.get("/api/applicant/all-message-admin");
        console.log("mesasage", response);

        setNotificationUser(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotificationsUser();
  }, [isLogged, token]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const fetchMyAppliedJob = async () => {
      try {
        if (isLogged) {
          const response = await axios.get("/api/applicant/my-applies", {
            headers: {
              Authorization: token,
            },
          });
          console.log("My applied job", response);
          setMyAppliedJob(response?.data || []);
        }
      } catch (error) {
        console.error("My applied job fetch error:", error);
      }
    };
    fetchMyAppliedJob();
  }, [isLogged, token]);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      Cookies.remove("token");
      setIsLogged(false);
      setUsersData(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const tokenManager = async (token) => {
    Cookies.set("token", token, { expires: 7 });
    setIsLogged(true);
    setLoading(false);
  };

  const signupTokenManager = async (token) => {
    Cookies.set("signupToken", token, { expires: 7 });
    setIsLogged(true);
    setLoading(false);
  };

  const signupTokenClearManager = async () => {
    Cookies.remove("signupToken");
    setIsLogged(false);
    setLoading(false);
  };

  const clearNotificationsAdmin = async () => {
    try {
      await axios.delete("/api/job/clear-notifications", {
        headers: {
          Authorization: token,
        },
      });
      setNotificationAdmin([]);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  };
  //crete notfication user
  const clearNotificationUser = async (notificationData) => {
    try {
      await axios.delete(
        "/api/applicant/clear-notifications",
        notificationData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setNotificationUser([]);
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setIsLogged,
        usersData,
        token,
        isLogged,
        logout,
        tokenManager,
        loading,
        notificationUser,
        clearNotificationsAdmin,
        signupToken,
        signupTokenManager,
        signupTokenClearManager,
        myAppliedJob,
        notificationAdmin,
        clearNotificationUser,
        setIsDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
