import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "./App.css";

function App() {
  const [user, setUser] = useState({});

  const createOrGetUser = (res) => {
    const userCredentials = jwtDecode(res.credential);
    setUser((user) => ({
      ...user,
      _id: userCredentials.sub,
      _type: "user",
      name: userCredentials.name,
      image: userCredentials.picture,
    }));
  };
  // console.log(user);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="App">
        <header className="App-header">
          {/* {user ? (
            <div>Logged in</div>
          ) : (
            <GoogleLogin
              onSuccess={(res) => createOrGetUser(res)}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )} */}
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res)}
            onError={() => {
              console.log("Login Failed");
            }}
          />
          <div>
            <h1>{user.name}</h1>
            <img src={user.image} alt="" />
          </div>
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}
googleLogout();

export default App;
