import React, { useRef } from "react";
import Register from "./Register";
import Login from "./Login";

function AuthPopup(props) {
    const { userEmail, isRegister } = props;
    const clsbtn = useRef(null);
  return (
    <div className="modal" tabIndex="-1" id="auth-popup">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={clsbtn}
            ></button>
          </div>
          <div className="modal-body">
                {
                    isRegister ? <Register btn={clsbtn} userEmail={userEmail}/> : <Login btn={clsbtn} />
                }
          </div>         
        </div>
      </div>
    </div>
  );
}

export default AuthPopup;
