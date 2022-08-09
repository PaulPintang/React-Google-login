import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";

import "./App.css";

function App() {
  const [user, setUser] = useState({});

  const createOrGetUser = (res) => {
    const userCredentials = jwtDecode(res.credential);
    if (localStorage.getItem("user" === null)) {
      localStorage.setItem("user", JSON.stringify([]));
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
    setUser((user) => ({
      ...user,
      _id: userCredentials.sub,
      _type: "user",
      name: userCredentials.name,
      image: userCredentials.picture,
    }));
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="App">
        <header className="App-header">
          {user ? (
            <div>
              <div>
                <h1>{user.name}</h1>
                <img src={user.image} alt="" />
              </div>
              <button
                onClick={() => {
                  googleLogout();
                  setUser(null);
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={(res) => createOrGetUser(res)}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}
        </header>
      </div>
    </GoogleOAuthProvider>
  );
}
googleLogout();

export default App;
