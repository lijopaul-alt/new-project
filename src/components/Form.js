import React from "react";

const Form = (props) => {
  const handleFormSubmit = (
    e,
    setExistingEmail,
    listOfEmployees,
    currentId,
    fromValue,
    setMobNumError,
    setNameError,
    setEmailError,
    addoredit,
    clearInput,
    setID,
    id
  ) => {
    e.preventDefault();

    const emailAlreadyExist =
      currentId === ""
        ? listOfEmployees.find((email) =>
            email.email === fromValue.email ? true : false
          )
        : undefined;
    const emailValidator =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    let validity;

    if (
      fromValue.name === "" &&
      fromValue.email === "" &&
      fromValue.mobile === ""
    ) {
      if (fromValue.id !== "") {
        setID(id);
        validity = true;
      } else if (fromValue.id === "") {
        validity = true;
      }
    } else {
      validity = false;
    }

    if (validity) {
      setMobNumError(true);
      setEmailError(true);
      return setNameError(true);
    }

    switch (
      fromValue.email !== "" ||
      fromValue.mobile.toString() >= 1 ||
      fromValue.name !== ""
    ) {
      case fromValue.mobile.toString().length === 10 &&
        fromValue.name.length >= 4 &&
        !emailValidator.test(fromValue.email):
        setMobNumError(false);
        setNameError(false);
        return setEmailError(true);
      case emailValidator.test(fromValue.email) &&
        fromValue.mobile.toString().length < 10 &&
        fromValue.name.length >= 4:
        setNameError(false);
        setEmailError(false);
        return setMobNumError(true);
      case fromValue.mobile.toString().length === 10 &&
        fromValue.name.length < 4 &&
        emailValidator.test(fromValue.email):
        setMobNumError(false);
        setEmailError(false);
        return setNameError(true);

      case emailValidator.test(fromValue.email) &&
        fromValue.mobile.toString().length < 10 &&
        fromValue.name.length < 4:
        setNameError(true);

        setMobNumError(true);
        setEmailError(false);
        return;
      case fromValue.name.length >= 4 &&
        !emailValidator.test(fromValue.email) &&
        fromValue.mobile.toString().length < 10:
        setEmailError(true);
        setMobNumError(true);
        return setNameError(false);
      case fromValue.name.length < 4 &&
        fromValue.mobile.toString().length === 10 &&
        !emailValidator.test(fromValue.email):
        setNameError(true);
        setMobNumError(false);
        return setEmailError(true);
      case emailAlreadyExist &&
        fromValue.name.length >= 4 &&
        fromValue.mobile.toString().length === 10 &&
        emailValidator.test(fromValue.email):
        setNameError(false);
        setMobNumError(false);
        setEmailError(false);
        return setExistingEmail(true);
      case !emailAlreadyExist &&
        emailValidator.test(fromValue.email) &&
        fromValue.name.length >= 4 &&
        fromValue.mobile.toString().length === 10:
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

      default:
        return;
    }

    // if (
    //   fromValue.name.length < 4 &&
    //   fromValue.mobile.toString().length < 10 &&
    //   !fromValue.email.includes("@" && ".com")
    // ) {
    //   setMobNumError(true);
    //   setEmailError(true);
    //   return setNameError(true);
    // } else if (
    //   fromValue.mobile.toString().length < 10 &&
    //   fromValue.name.length >= 4 &&
    //   fromValue.email.includes("@" && ".com")
    // ) {
    //   setNameError(false);
    //   setEmailError(false);
    //   return setMobNumError(true);
    // } else if (
    //   fromValue.mobile.toString().length === 10 &&
    //   fromValue.name.length < 4 &&
    //   fromValue.email.includes("@" && ".com")
    // ) {
    //   setMobNumError(false);
    //   setEmailError(false);
    //   return setNameError(true);
    // } else if (
    //   fromValue.mobile.toString().length === 10 &&
    //   fromValue.name.length >= 4 &&
    //   !fromValue.email.includes("@" && ".com")
    // ) {
    //   setMobNumError(false);
    //   setNameError(false);
    //   return setEmailError(true);
    // } else if (
    //   fromValue.email.includes("@" && ".com") &&
    //   fromValue.mobile.toString().length < 10 &&
    //   fromValue.name.length < 4
    // ) {
    //   setNameError(true);

    //   setMobNumError(true);
    //   setEmailError(false);
    //   return;
    // } else if (
    //   fromValue.name.length >= 4 &&
    //   !fromValue.email.includes("@" && ".com") &&
    //   fromValue.mobile.toString().length < 10
    // ) {
    //   setEmailError(true);
    //   setMobNumError(true);
    //   return setNameError(false);
    // } else if (
    //   fromValue.name.length < 4 &&
    //   fromValue.mobile.toString().length === 10 &&
    //   !fromValue.email.includes("@" && ".com")
    // ) {
    //   setNameError(true);
    //   setMobNumError(false);
    //   return setEmailError(true);
    // } else if (
    //   fromValue.name.length >= 4 &&
    //   fromValue.mobile.toString().length === 10 &&
    //   fromValue.email.includes("@" && ".com") &&
    //   emailAlreadyExist
    // ) {
    //   setNameError(false);
    //   setMobNumError(false);
    //   setEmailError(false);
    //   return setExistingEmail(true);
    // } else if (
    //   fromValue.name.length >= 4 &&
    //   fromValue.mobile.toString().length === 10 &&
    //   fromValue.email.includes("@" && ".com") &&
    //   !emailAlreadyExist
    // ) {
    //   if (currentId === "") {
    //     addoredit(fromValue);
    //     setID(id + 1);
    //     clearInput();
    //     setNameError(false);

    //     setEmailError(false);
    //     setMobNumError(false);
    //     return setExistingEmail(false);
    //   } else {
    //     addoredit(fromValue);
    //     setID(id + 1);
    //     clearInput();
    //     setNameError(false);
    //     setEmailError(false);
    //     setMobNumError(false);
    //     return setExistingEmail(false);
    //   }
    // }
  };
  return (
    <form
      autoComplete="off"
      onSubmit={(e) =>
        handleFormSubmit(
          e,
          props.setExistingEmail,
          props.listOfEmployees,
          props.currentId,
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
