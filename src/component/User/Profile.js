import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
        navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
          {user && user.avatar && user.avatar.url ? (
              <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to="/me/update">Edit Profile</Link>
              </div>
            ) : null}
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user && user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user && user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{user && String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;