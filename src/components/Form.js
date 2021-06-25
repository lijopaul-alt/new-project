import React from "react";

const Form = (props) => {
  const handleFormSubmit = (
    e,
    fromValue,
    setMobNumError,
    setNameError,
    addoredit,
    clearInput,
    setID,
    id
  ) => {
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
  return (
    <form
      autoComplete="off"
      onSubmit={(e) =>
        handleFormSubmit(
          e,
          props.fromValue,
          props.setMobNumError,
          props.setNameError,
          props.addoredit,
          props.clearInput,
          props.setID,
          props.id
        )
      }
      className="form"
    >
      {props.children}
    </form>
  );
};

export default Form;
