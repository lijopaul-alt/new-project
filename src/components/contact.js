import React, { useState } from "react";
import ContactForm from "./contactform";
import Pagination from "./pagination";

const Contact = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  const addoredit = (obj) => {
    const newItem = obj;

    setEmployeeList([...employeeList, newItem]);
  };
  let removedList;
  const removeList = (id) => {
    removedList = employeeList.filter((emp) => {
      return emp.id !== id;
    });
    console.log(removedList);
    setEmployeeList([...removedList]);
  };

  // GET CURRENT POST

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = employeeList.slice(indexOfFirstPost, indexOfLastPost);

  //CHANGE PAGE
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          =<h1 className="display-4 text-center">EMPLOYEE LIST</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <div>contact form</div>

          <ContactForm
            addoredit={addoredit}
            currentId={currentId}
            employeeList={employeeList}
          />
        </div>
        <div className="col-md-7">
          <div>employee list</div>
          <div className="input-group search">
            <div className="form-outline">
              <input
                type="search"
                id="form1"
                className="form-control"
                placeholder="search using name"
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>
          </div>
          <table className="table table=borderless table-stripped">
            <thead className="table table-borderless bg-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile num</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts
                .filter((employee) => {
                  if (setSearchItem === "") {
                    return employee;
                  }
                  if (
                    employee.name
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return employee;
                  }
                })
                .map((employee, i) => {
                  return (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.mobile}</td>
                      <td>
                        <a
                          href="!#"
                          className="btn btn-primary text-white"
                          onClick={() => {
                            setCurrentId(employee.id);
                          }}
                        >
                          <i className="fa fa-pencil" />
                        </a>
                        <a
                          href="!#"
                          className="btn btn-danger text-white"
                          onClick={() => removeList(employee.id)}
                        >
                          <i className="fa fa-trash" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPost={employeeList.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};
export default Contact;
