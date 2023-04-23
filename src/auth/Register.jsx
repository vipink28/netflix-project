import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./FirebaseAuth";
import { useDispatch } from "react-redux";
import { userAction } from "../features/auth/auth.slice";

function Register(props) {
  const { userEmail, btn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userEmail !== "") {
      setEmail(userEmail);
    }
  }, [userEmail]);

  const handleRegister = (e) => {
    e.preventDefault();    
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {        
        updateProfile(auth.currentUser, {
            displayName: userName, phone: phone
          }).then(() => {
            dispatch(userAction({
                  status: true,
                  userDetails: auth.currentUser.displayName,
                  error: error,
                }));
               
          }).catch((error) => {
            userAction({
                error: error
            })
          });
      })
      .catch((error) => {
        setError({
          errorCode: error.code,
          errorMessage: error.message,
        });
      });
      btn.current.click();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <>     
        <div className="register-form">
          <h5 className="text-center">Register</h5>
          <form>
          <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                value={userName}
                placeholder="Your Name"
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                type="number"
                value={phone}
                placeholder="Phone"
                onChange={handlePhoneChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="btn btn-light fw-bold" onClick={handleRegister}>
              Register
            </button>
            {error && <p>{error.errorMessage}</p>}
          </form>
        </div>
    </>
  );
}

export default Register;
