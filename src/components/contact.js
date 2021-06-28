import React, { useEffect, useState } from "react";
import ContactForm from "./Contactform";
import Pagination from "./Pagination";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
const Contact = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [idToDelete, setidToDelete] = useState("");
  const [openModal, setOpenmodal] = useState(false);
  let [previousPage, setPreviousPage] = useState("");
  const searchInput = React.useRef(null);

  const addoredit = (obj) => {
    if (currentId === "") {
      const newItem = obj;

      return setEmployeeList([...employeeList, newItem]);
    } else {
      const newItem = obj;

      const upadtedList = employeeList.map((emp) => {
        if (emp.id === newItem.id) {
          const updatedItem = {
            ...emp,
            name: newItem.name,
            email: newItem.email,
            mobile: newItem.mobile,
            id: newItem.id,
          };
          return updatedItem;
        } else {
          return emp;
        }
      });
      console.log(newItem, upadtedList);
      setCurrentId("");
      return setEmployeeList([...upadtedList]);
    }
  };
  let removedList;
  const removeList = (id) => {
    removedList = employeeList.filter((emp) => {
      return emp.id !== id;
    });

    setEmployeeList([...removedList]);
  };

  const displayModal = (id) => {
    setOpenmodal(true);
    setidToDelete(id);
  };
  const handleClose = () => {
    setOpenmodal(false);
  };
  const agreedToDelete = () => {
    removeList(idToDelete);
    handleClose();
    setidToDelete("");
  };
  const disagreedToDelete = () => {
    handleClose();
    setidToDelete("");
  };
  const whileSearching = (value) => {
    setSearchItem(value);

    return setCurrentPage(1);
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
  const searchResultPost = whenFilter.slice(indexOfFirstPost, indexOfLastPost);

  //CHANGE PAGE
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const postsPerPages = (e) => {
    setPostsPerPage(e);
  };

  // const resetPageNum = () => {
  //
  // };

  useEffect(() => {
    if (
      searchItem === "" &&
      currentPosts.length > 0 &&
      document.activeElement === searchInput.current
    ) {
      return setCurrentPage(previousPage);
    }
  }, [searchItem, currentPosts.length, previousPage]);
  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are sure to delete the item from the list ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagreedToDelete} color="primary">
            Disagree
          </Button>
          <Button onClick={agreedToDelete} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

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
            setCurrentId={setCurrentId}
          />
        </div>
        <div className="col-md-7">
          <div className="d-flex flex-lg-row">
            <div>
              <span>list per page</span>
              <input
                type="number"
                onChange={(e) => postsPerPages(e.target.value)}
                className="pag-list"
                value={postsPerPage}
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
                  onChange={(e) => whileSearching(e.target.value)}
                  onFocus={() => setPreviousPage(currentPage)}
                  ref={searchInput}
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
                          <span
                            className="btn btn-primary text-white"
                            onClick={() => {
                              setCurrentId(employee.id);
                            }}
                          >
                            <i className="fa fa-pencil" />
                          </span>
                          <span
                            className="btn btn-danger text-white"
                            onClick={() => displayModal(employee.id)}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </td>
                      </tr>
                    );
                  })
                : searchResultPost.map((employee) => {
                    return (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>
                        <td>
                          <span
                            className="btn btn-primary text-white"
                            onClick={() => {
                              setCurrentId(employee.id);
                            }}
                          >
                            <i className="fa fa-pencil" />
                          </span>
                          <span
                            className="btn btn-danger text-white"
                            onClick={() => displayModal(employee.id)}
                          >
                            <i className="fa fa-trash" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
            {searchItem.length >= 1 && whenFilter.length === 0 ? (
              <p className="pg-not-found">Name not found</p>
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
