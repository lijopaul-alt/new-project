import React, { useState, useEffect } from "react";

const ContactForm = ({ addoredit, currentId, employeeList }) => {
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    id: "",
  };
  const [id, setID] = useState(0);
  const [fromValue, setFormvalue] = useState(initialState);
  const [NameError, setNameError] = useState(false);
  const [MobNumError, setMobNumError] = useState(false);

  const inputChange = (e) => {
    e.preventDefault();
    setFormvalue({
      ...fromValue,
      [e.target.name]: e.target.value,
      id: id,
    });
  };

  const clearInput = () => {
    setFormvalue(initialState);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (fromValue.name.length < 4 && fromValue.mobile.toString().length < 10) {
      setMobNumError(true);
      return setNameError(true);
    } else if (
      fromValue.mobile.toString().length < 10 &&
      fromValue.name.length >= 4
    ) {
      setNameError(false);
      return setMobNumError(true);
    } else if (
      fromValue.mobile.toString().length === 10 &&
      fromValue.name.length < 4
    ) {
      setMobNumError(false);
      return setNameError(true);
    } else if (
      fromValue.name.length >= 4 &&
      fromValue.mobile.toString().length === 10
    )
      addoredit(fromValue);
    setID(id + 1);
    clearInput();
    setNameError(false);
    setMobNumError(false);
  };

  useEffect(() => {
    let findItem;
    if (currentId === "") {
      setFormvalue({ ...initialState });
    }
    if (currentId !== "") {
      findItem = employeeList.find((emp) => {
        return emp.id === currentId;
      });
      setFormvalue({
        ...findItem,
      });
    }
  }, [currentId, employeeList]);

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit} className="form">
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            <i className="fa fa-user" />
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="your name"
          value={fromValue.name}
          onChange={inputChange}
          name="name"
        />
      </div>
      {NameError ? (
        <span className="error">must contain atleast four character</span>
      ) : null}
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            <i className="fa fa-envelope" />
          </span>
        </div>
        <input
          type="email"
          className="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="your email"
          value={fromValue.email}
          name="email"
          onChange={inputChange}
        />
      </div>
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            <i className="fa fa-phone" />
          </span>
        </div>
        <input
          type="number"
          pattern={0 - 9}
          className="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="your mobile number"
          value={fromValue.mobile}
          name="mobile"
          onChange={inputChange}
        />
      </div>
      {MobNumError ? (
        <span className="error">must contain only 10 num</span>
      ) : null}

      <button
        type="submit"
        value="save"
        className="btn btn=primary btn-block bg-primary text-white w-100"
      >
        SAVE
      </button>
    </form>
  );
};

export default ContactForm;
