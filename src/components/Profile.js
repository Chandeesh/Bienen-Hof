import React from "react";
import { Redirect  } from 'react-router-dom';
import { useSelector } from "react-redux";
const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect  to="/login" />;
  }
  return (
    <div className="container" style={{paddingTop: "20px"}}>
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.details.email}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Auth Token:</strong> {currentUser.token}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.details.email}
      </p>
    </div>
  );
};
export default Profile;