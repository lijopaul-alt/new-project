import React, { useEffect, useState } from "react";
import ContactForm from "./contactform";
import Pagination from "./pagination";

const Contact = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [nameNotFound, setNameNotFound] = useState(true);

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
  const whenFilter = employeeList.filter((employee) => {
    if (employee.name.toLowerCase().includes(searchItem.toLowerCase())) {
      return employee;
    }
  });

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
          <div className="d-flex flex-lg-row">
            <div>
              <span>list per page</span>
              <input
                type="number"
                onChange={(e) => setPostsPerPage(+e.target.value)}
                className="pag-list"
              ></input>
            </div>
            <div className="input-group search">
              <div className="form-outline">
                <span>search filter</span>
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="search using name"
                  onChange={(e) => setSearchItem(e.target.value)}
                />
              </div>
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
              {searchItem === ""
                ? currentPosts.map((employee) => {
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
                  })
                : whenFilter.map((employee) => {
                    return (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>
                        <td>
                          <a
                            className="btn btn-primary text-white"
                            onClick={() => {
                              setCurrentId(employee.id);
                            }}
                          >
                            <i className="fa fa-pencil" />
                          </a>
                          <a
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
            {searchItem.length >= 1 && whenFilter.length === 0 ? (
              <p className="pg-not-found">page not found</p>
            ) : null}
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPost={
              searchItem === "" ? employeeList.length : whenFilter.length
            }
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};
export default Contact;
