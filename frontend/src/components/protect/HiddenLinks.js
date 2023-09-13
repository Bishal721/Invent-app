import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
  const isLoggedin = useSelector(selectIsLoggedIn);
  if (isLoggedin) {
    return <>{children}</>;
  }
  return null;
};
export const ShowOnLogOut = ({ children }) => {
  const isLoggedin = useSelector(selectIsLoggedIn);

  if (!isLoggedin) {
    return <>{children}</>;
  }
  return null;
};
