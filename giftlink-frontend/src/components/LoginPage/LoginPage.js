import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import "./LoginPage.css";

function LoginPage() {
  //insert code here to create useState hook variables for email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Insert code here Task 4: Include a state for incorrect password.
  const [incorrect, setIncorrect] = useState("");

  //Insert code here Task 5: Create a local variable for `navigate`,`bearerToken`
  const navigate = useNavigate();
  const bearerToken = sessionStorage.getItem("bearer-token");
  const { setIsLoggedIn } = useAppContext();

  //Insert code here Task 6. If the bearerToken has a value (user already logged in), navigate to MainPage
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/app");
    }
  }, [navigate]);

  // insert code here to create handleLogin function and include console.log
  const handleLogin = async (e) => {
    e.preventDefault();
    //api call
    const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
      //Step 1 - Task 7
      method: "POST",
      //Step 1 - Task 8
      headers: {
        "content-type": "application/json",
        Authorization: bearerToken ? `Bearer ${bearerToken}` : "", // Include Bearer token if available
      },
      //Step 1 - Task 9
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    //Step 2: Task 1
    const json = await res.json();
    console.log("Json", json);
    if (json.authtoken) {
      //Step 2: Task 2
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", json.userName);
      sessionStorage.setItem("email", json.userEmail);
      //Step 2: Task 3
      setIsLoggedIn(true);
      //Step 2: Task 4
      navigate("/app");
    } else {
      //Step 2: Task 5
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      setIncorrect("Wrong password. Try again.");
      setTimeout(() => {
        setIncorrect("");
      }, 2000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Login</h2>

            {/* insert code here to create input elements for the variables email and  password */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form label">
                Password
              </label>
              <br />
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/*Step 2: Task 6*/}
              <span
                style={{
                  color: "red",
                  height: ".5cm",
                  display: "block",
                  fontStyle: "italic",
                  fontSize: "12px",
                }}
              >
                {incorrect}
              </span>
            </div>

            {/* insert code here to create a button that performs the `handleLogin` function on click */}
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleLogin}
            >
              Login
            </button>
            <p className="mt-4 text-center">
              New here?{" "}
              <a href="/app/register" className="text-primary">
                Register Here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
