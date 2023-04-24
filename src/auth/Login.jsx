import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./FirebaseAuth";
import { useDispatch } from "react-redux";
import { userAction } from "../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const { btn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(userAction({
            status: true,
            userDetails: user.displayName,
            error: error
        }));        
        navigate('/');
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

  return (
    <div>
         <h5 className="text-center">Login</h5>
         <form>
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
      <button className="btn btn-light fw-bold" onClick={handleLogin}>Login</button>
      {error && <p>{error.errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
