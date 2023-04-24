import React from "react";

function Loader(props) {
  return (
    <div className="d-flex align-items-center justify-content-center h-100">
    <div
      className="spinner-border text-light"
      style={{width: 3+'rem', height: 3+'rem'}}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
    </div>
  );
}

export default Loader;
