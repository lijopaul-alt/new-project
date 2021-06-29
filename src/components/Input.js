import React from "react";
const Input = ({ type, placeholder, name, value, inputChange, icon }) => {
  return (
    <div className="input-group input-group-sm mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className="form-control"
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        placeholder={placeholder}
        value={value}
        onChange={inputChange}
        name={name}
      />
    </div>
  );
};

export default Input;
