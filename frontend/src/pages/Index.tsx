
import { Navigate } from "react-router-dom";

const Index = () => {
  // This page serves as a redirector to the landing page
  return <Navigate to="/" replace />;
};

export default Index;
