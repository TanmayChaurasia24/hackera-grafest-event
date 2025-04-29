"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import axios from "axios";

// Define user type
type User = {
  id: string;
  teamid: string;
  points: number;
};

// Define context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (teamid: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user if token exists
  useEffect(() => {
    const token = Cookies.get("loggedin");
    if (token) {
      axios
        .get("http://localhost:5000/api/teams/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const team = response.data;
          setUser({
            id: team.id,
            teamid: team.teamid,
            points: team.points,
          });
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          Cookies.remove("loggedin");
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (teamid: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/teams/login", {
        teamId: teamid,
        password,
      });

      const token = response.data.token;
      const id = response.data.teamId;

      if (!token || !id) {
        toast({
          title: "Error",
          description: "Invalid credentials!",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Save token
      Cookies.set("loggedin", token, { expires: 1, secure: true, path: "/" });

      // Fetch team profile after login
      const profileRes = await axios.get("http://localhost:5000/api/teams/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const team = profileRes.data;

      setUser({
        id: team.id,
        teamid: team.teamid,
        points: team.points,
      });

      toast({
        title: "Success",
        description: "Logged in successfully!",
        variant: "default",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Login failed!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    Cookies.remove("loggedin");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
