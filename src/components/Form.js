import React from "react";

const Form = (props) => {
  const handleFormSubmit = (
    e,
    setExistingEmail,
    listOfEmployees,

    fromValue,
    setMobNumError,
    setNameError,
    setEmailError,
    addoredit,
    clearInput,
    setID,
    id,
    currentId
  ) => {
    e.preventDefault();

    const emailAlreadyExist = listOfEmployees.find((email) =>
      email.email === fromValue.email ? true : false
    );
    console.log(listOfEmployees, emailAlreadyExist);

    if (
      fromValue.name.length < 4 &&
      fromValue.mobile.toString().length < 10 &&
      !fromValue.email.includes("@" && ".com")
    ) {
      setMobNumError(true);
      setEmailError(true);
      return setNameError(true);
    } else if (
      fromValue.mobile.toString().length < 10 &&
      fromValue.name.length >= 4 &&
      fromValue.email.includes("@" && ".com")
    ) {
      setNameError(false);
      setEmailError(false);
      return setMobNumError(true);
    } else if (
      fromValue.mobile.toString().length === 10 &&
      fromValue.name.length < 4 &&
      fromValue.email.includes("@" && ".com")
    ) {
      setMobNumError(false);
      setEmailError(false);
      return setNameError(true);
    } else if (
      fromValue.mobile.toString().length === 10 &&
      fromValue.name.length >= 4 &&
      !fromValue.email.includes("@" && ".com")
    ) {
      setMobNumError(false);
      setNameError(false);
      return setEmailError(true);
    } else if (
      fromValue.email.includes("@" && ".com") &&
      fromValue.mobile.toString().length < 10 &&
      fromValue.name.length < 4
    ) {
      setNameError(true);

      setMobNumError(true);
      setEmailError(false);
      return;
    } else if (
      fromValue.name.length >= 4 &&
      !fromValue.email.includes("@" && ".com") &&
      fromValue.mobile.toString().length < 10
    ) {
      setEmailError(true);
      setMobNumError(true);
      return setNameError(false);
    } else if (
      fromValue.name.length < 4 &&
      fromValue.mobile.toString().length === 10 &&
      !fromValue.email.includes("@" && ".com")
    ) {
      setNameError(true);
      setMobNumError(false);
      return setEmailError(true);
    } else if (
      fromValue.name.length >= 4 &&
      fromValue.mobile.toString().length === 10 &&
      fromValue.email.includes("@" && ".com") &&
      emailAlreadyExist
    ) {
      setNameError(false);
      setMobNumError(false);
      setEmailError(false);
      return setExistingEmail(true);
    } else if (
      fromValue.name.length >= 4 &&
      fromValue.mobile.toString().length === 10 &&
      fromValue.email.includes("@" && ".com") &&
      !emailAlreadyExist
    ) {
      if (currentId === "") {
        addoredit(fromValue);
        setID(id + 1);
        clearInput();
        setNameError(false);

        setEmailError(false);
        setMobNumError(false);
        return setExistingEmail(false);
      } else {
        addoredit(fromValue);
        setID(id + 1);
        clearInput();
        setNameError(false);
        setEmailError(false);
        setMobNumError(false);
        return setExistingEmail(false);
      }
    }
  };
  return (
    <form
      autoComplete="off"
      onSubmit={(e) =>
        handleFormSubmit(
          e,
          props.setExistingEmail,
          props.listOfEmployees,

          props.fromValue,
          props.setMobNumError,
          props.setNameError,
          props.setEmailError,
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
