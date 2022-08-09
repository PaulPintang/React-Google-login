import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "./App.css";

function App() {
  const [user, setUser] = useState();

  const createOrGetUser = (res) => {
    const decoded = jwtDecode(res.credential);
    console.log(decoded);
  };
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="App">
        <header className="App-header">
          <button onClick={googleLogout()}>LOGOUT</button>
          {user ? (
            <div>Logged in</div>
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
