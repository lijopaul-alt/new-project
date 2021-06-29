import React, { useState, useEffect } from "react";
import Input from "./Input";
import Form from "./Form";

const ContactForm = ({
  addoredit,
  currentId,
  employeeList,
  setCurrentId,
  existingEmail,
  setExistingEmail,
  NameError,
  setNameError,
  emailError,
  setEmailError,
  MobNumError,
  setMobNumError,
}) => {
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    id: "",
  };
  const [id, setID] = useState(0);
  const [fromValue, setFormvalue] = useState(initialState);

  const [listOfEmployees, setListOfemployees] = useState([]);

  const inputChange = (e) => {
    e.preventDefault();
    setFormvalue({
      ...fromValue,
      [e.target.name]: e.target.value,
      id: currentId === "" ? id : currentId,
    });
  };

  const clearInput = () => {
    setFormvalue(initialState);
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
    setListOfemployees(employeeList);
  }, [currentId, employeeList]);

  return (
    <Form
      fromValue={fromValue}
      setNameError={setNameError}
      setMobNumError={setMobNumError}
      addoredit={addoredit}
      clearInput={clearInput}
      setID={setID}
      id={id}
      currentId={currentId}
      setCurrentId={setCurrentId}
      employeeList={employeeList}
      setEmailError={setEmailError}
      listOfEmployees={listOfEmployees}
      setExistingEmail={setExistingEmail}
    >
      <Input
        type={"text"}
        placeholder={"your name"}
        name={"name"}
        value={fromValue.name}
        inputChange={inputChange}
      />
      {NameError ? (
        <span className="error">must contain atleast four character</span>
      ) : null}
      <Input
        type={"email"}
        placeholder={"your email"}
        name={"email"}
        value={fromValue.email}
        inputChange={inputChange}
      />
      {emailError ? <span className="error">invalid Email</span> : null}
      {existingEmail ? (
        <span className="error"> Email alreay exists</span>
      ) : null}
      <Input
        type={"number"}
        placeholder={"your mobile number"}
        name={"mobile"}
        value={fromValue.mobile}
        inputChange={inputChange}
      />

      {MobNumError ? (
        <span className="error">must contain only 10 num</span>
      ) : null}

      <button
        type="submit"
        value="save"
        className="btn btn=primary btn-block bg-primary text-white w-100"
      >
        {currentId === "" ? "SAVE" : "UPDATE"}
      </button>
    </Form>
  );
};

export default ContactForm;
