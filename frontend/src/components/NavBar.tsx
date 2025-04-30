import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, Lock, Trophy, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/images/hackera_logo.png";
import logo_grafest from "@/images/gra_w_label-1.png"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
type NavLink = {
  name: string;
  href: string;
  icon: React.ElementType;
};
const NavBar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [navlinks, setNavlinks] = useState<NavLink[]>([]);
  
  const fetch_points = async () => {
    const points_backend_response = await axios.get(
      `https://hackera-backend.onrender.com/api/questions/${user?.teamid}/points/`
    );
    // console.log("current leader borad is: ", points_backend_response);

    return points_backend_response.data.points;
  };

  const {
    data: points,
    isLoading,
  } = useQuery({
    queryKey: ["points"],
    queryFn: fetch_points,
    refetchInterval: 5000,
  });

  useEffect(() => {
  
    if (isAuthenticated) {
      setNavlinks([
        { name: "Challenges", href: "/challenges", icon: Lock },
        { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
      ]);
      
    } else {
      setNavlinks([]);
    }
  }, [isAuthenticated,user,logout]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Logo for all screens, use Mr Robot font */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="HACK=ERA"
              className="w-full md:max-w-lg h-10 lg:max-w-sm"
            />
          </Link>
          <Link to="#" className="flex items-center gap-2">
            <img
              src={logo_grafest}
              alt="HACK=ERA"
              className="w-full md:max-w-lg h-10"
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navlinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-2 text-sm transition-colors hover:text-primary ${
                isActive(link.href)
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              } body-content`}
            >
              <link.icon className="h-4 w-4" />
              {link.name}
            </Link>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm body-content">
                <User className="h-4 w-4" />
                <span className="text-secondary font-medium">
                  {user?.teamid}
                </span>
                <span className="text-muted-foreground">
                  ({isLoading ? 0 : points} pts)
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-primary text-primary hover:bg-primary/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : null}
        </nav>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-secondary text-secondary"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-l border-border/40"
          >
            <nav className="flex flex-col gap-4 mt-8">
              {navlinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 p-2 rounded-md text-sm transition-colors ${
                    isActive(link.href)
                      ? "bg-muted text-primary neon-text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 p-2 mt-2 border-t border-border">
                    <User className="h-4 w-4 text-secondary" />
                    <span className="text-secondary font-medium">
                      {user?.teamid}
                    </span>
                    <span className="text-muted-foreground">
                      ({user?.points} pts)
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="mt-2 border-primary text-primary hover:bg-primary/20"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : null}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default NavBar;
