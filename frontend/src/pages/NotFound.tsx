
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import MatrixBackground from "@/components/MatrixBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <MatrixBackground />
      <div className="text-center space-y-6 max-w-md p-6">
        <div className="flex justify-center">
          <Shield className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-5xl font-bold text-primary neon-text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Access Denied: This resource does not exist or you lack authorization to view it.
        </p>
        <Button asChild className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
          <Link to="/">Return to Secure Zone</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
