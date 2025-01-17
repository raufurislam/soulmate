import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
