import AppRoutes from "./routes";
import AuthRoutes from "./auth.routes";

import { useAuth } from "../hooks/auth";

const Routess = () => {
  const { logged } = useAuth();

  return <>{logged ? <AppRoutes /> : <AuthRoutes />}</>;
};

export default Routess;
