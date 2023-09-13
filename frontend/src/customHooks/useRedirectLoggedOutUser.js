import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetLoginStatus } from "../services/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await GetLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));
      if (!isLoggedIn) {
        toast.info("Session Expired Please login to Continue");
        navigate(path);
        return 
      }
    };
    redirectLoggedOutUser()
  }, [navigate,path,dispatch]);
};

export default useRedirectLoggedOutUser;
