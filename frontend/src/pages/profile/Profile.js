import React, { useEffect, useState } from "react";
import "./Profile.scss";
import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOutUser";
import { useDispatch } from "react-redux";
import { GetUser } from "../../services/authService";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await GetUser();
      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);
  return (
    <div className="profile --my2">
      {isLoading && <Loader />}
      <>
        {!isLoading && profile === null ? (
          <p>Semething Went Wrong, Please Reload The Page</p>
        ) : (
          <Card className={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.image} alt="Profile Pic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name: </b> {profile?.name}
              </p>
              <p>
                <b>Email: </b> {profile?.email}
              </p>
              <p>
                <b>Phone: </b> {profile?.phone}
              </p>
              <p>
                <b>Bio: </b> {profile?.Bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
