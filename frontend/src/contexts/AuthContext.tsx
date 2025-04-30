import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom";

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

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = Cookies.get("loggedin");
    if (storedUser) {
      try {
        const parsedUser: any = jwtDecode(storedUser);
        // console.log(parsedUser);
        
        setUser({
          id: parsedUser.id,
          teamid: parsedUser.teamId,
          points: parsedUser.points
        });

      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("hackeraUser");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (teamid: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    try {
      const login_response = await axios.post(
        "https://hackera-backend.onrender.com/api/teams/login",
        {
          teamId: teamid,
          password,
        }
      );

      if (!login_response) {
        toast({
          title: "Error",
          description: "Try Again! Enter correct credentials",
          variant: "destructive",
        });
      }

      // console.log("login response is: ", login_response);
      const token = login_response.data.token;

      if (token) {
        // console.log("token is: ", token);
        Cookies.set("loggedin", token, { expires: 1, secure: true, path: "/" });
      }

      const parsedUser: any = jwtDecode(token);
      // console.log(parsedUser);
      
      setUser({
        id: parsedUser.id,
        teamid: parsedUser.teamId,
        points: parsedUser.points
      });

      toast({
        title: "success",
        description: "logged in!",
        variant: "default",
      });

    } catch (err) {
      toast({
        title: "Error",
        description: "Try Again! Enter correct credentials",
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
    navigate("/")
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
