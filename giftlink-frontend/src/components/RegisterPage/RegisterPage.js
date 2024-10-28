import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import "./RegisterPage.css";

function RegisterPage() {
  //insert code here to create useState hook variables for firstName, lastName, email, password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Step 1 - Task 4
  const [showerr, setShowerr] = useState("");

  //Step 1 - Task 5
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  // insert code here to create handleRegister function and include console.log
  const handleRegister = async () => {
    const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
      //Step 1 - Task 6
      method: "POST",
      //Step 1 - Task 7
      headers: {
        "content-type": "application/json",
      },
      //Step 1 - Task 8
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    });
    //Step 2 - Task 1
    const json = await response.json();
    console.log("json data", json);
    console.log("er", json.error);
    //Step 2 - Task 2
    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", firstName);
      sessionStorage.setItem("email", json.email);
      //Step 2 - Task 3
      setIsLoggedIn(true);
      //Step 2 - Task 4
      navigate("/app");
    }
    if (json.error) {
      //Step 2 - Task 5
      setShowerr(json.error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="register-card p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Register</h2>

            {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
            <div className="mb-4">
              <label htmlFor="firstName" className="form label">
                FirstName
              </label>
              <br />
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="Enter your firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="form label">
                LastName
              </label>
              <br />
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Enter your lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form label">
                Email
              </label>
              <br />
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Step 2 - Task 6*/}
              <div className="text-danger">{showerr}</div>
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
            </div>

            {/* insert code here to create a button that performs the `handleRegister` function on click */}
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="mt-4 text-center">
              Already a member?{" "}
              <a href="/app/login" className="text-primary">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  ); //end of return
}

export default RegisterPage;
