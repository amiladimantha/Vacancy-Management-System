import React, { useEffect, useState, Component } from "react";
import "react-table-6/react-table.css";
import Decryption from "../../../Component/Decryption";
import {
  Input,
  Form,
  Modal,
  message,
  Pagination,
} from "antd";
import "./users.css";
import axios from "axios";

export default function UsersList() {
  const [data, setData] = useState([]);
  const [type, setAccountType] = useState();
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const accountTypes = ["Manager", "Staff"];
  const approved = ["No", "Yes"];
  const active = ["No", "Yes"];

  useEffect(() => {
    getData();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7034/api/User/RegistrationList";
    axios
      .get(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listRegistration);
        }
      })
      .catch((error) => {
        message.error(error);
      });
    console.log("Array data", data);
  };

  const handleDelete = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7034/api/User/DeleteUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("User Deleted");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleBlock = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7034/api/User/BlockUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("User Blocked");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };



  const handleActivate = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7034/api/User/ActivateUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("User Activated");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleApprove = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7034/api/User/ApproveUser";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("Approved");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);
  
  const [sortByTable1, setSortByTable1] = useState({
    column: "id",
    order: "asc",
  });
  
  const handleSortTable1 = (column) => {
    const order =
      sortByTable1.column === column && sortByTable1.order === "asc" ? "desc" : "asc";
    setSortByTable1({ column, order });
  };
  
  const sortedDataTable1 = currentData.sort((a, b) => {
    const ascending = sortByTable1.order === "asc" ? 1 : -1;
    const descending = sortByTable1.order === "desc" ? 1 : -1;
    if (a[sortByTable1.column] < b[sortByTable1.column]) {
      return ascending;
    }
    if (a[sortByTable1.column] > b[sortByTable1.column]) {
      return descending;
    }
    return 0;
  });
  
  const getSortArrowTable1 = (column) => {
    if (sortByTable1.column === column) {
      return sortByTable1.order === "asc" ? "▲" : "▼";
    }
    return "";
  };
  
  


  const handleEditClick = (val) => {
    setEditData(val);
    setVisible(true);
  };

  const [id, setID] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();
  const [address, setAddress] = useState();

  const handleSaveClick = (e) => {
    e.preventDefault();
    
    console.log(editData);

    const url = "https://localhost:7034/api/User/EditUser";
    
    axios
      .post(url, editData)
      .then((result) => {
        const data = result.data;
        console.log(data);
        if (data.statusCode === 200) {
          message.success("User Edited Successfully");
        } else {
          message.error("User Editing Failed");
        }
        setVisible(false);
      })
      .catch((error) => {
        message.error(error);
      });
  };
  
  

  return (
    <>
      {(() => {
        if (type === "0") {
          return (
            
            <div>
              <h2>Users</h2>
              {currentData ? (
                <table className="datatable">
                  <thead>
                    <tr>
                      <th scope="col" style={{ borderTopLeftRadius: "20px" }} onClick={() => handleSortTable1("id")}>
                        ID {getSortArrowTable1("id")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("name")}>
                        Name {getSortArrowTable1("name")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("email")}>
                        Email {getSortArrowTable1("email")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("password")}>
                        Password {getSortArrowTable1("password")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("phone")}>
                        Phone {getSortArrowTable1("phone")}
                      </th>                      
                      <th scope="col" onClick={() => handleSortTable1("isActive")}>
                        Is Active {getSortArrowTable1("isActive")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("isApproved")}>
                        Is Approved {getSortArrowTable1("isApproved")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("accountType")}>
                        Account Type {getSortArrowTable1("accountType")}
                      </th>
                      <th scope="col">Approve</th>
                      <th scope="col">Activate</th>
                      <th scope="col">Block</th>
                      <th scope="col">Edit</th>
                      <th scope="col" style={{ borderTopRightRadius: "20px" }}>
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((val, index) => {
                      return (
                        <tr>
                          <td>{val.id}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>{Decryption(val.password)}</td>
                          <td>{val.phone}</td>
                          <td>{active[val.isActive]}</td>
                          <td>{approved[val.isApproved]}</td>
                          <td>{accountTypes[val.accountType - 1]}</td>  
                          <td>
                            {val.isApproved === 0 ? (
                              <button
                                className="userActive"
                                onClick={(e) => handleActivate(e, val.id)}
                              >
                                Approve
                              </button>
                            ) : (
                              "Approved"
                            )}
                          </td>                        
                          <td>
                            {val.isActive === 0 ? (
                              <button
                                className="userActive"
                                onClick={(e) => handleActivate(e, val.id)}
                              >
                                Activate
                              </button>
                            ) : (
                              "Active"
                            )}
                          </td>
                          <td>
                            {val.isActive === 1 ? (
                              <button
                                className="userBlock"
                                onClick={(e) => handleBlock(e, val.id)}
                              >
                                Block
                              </button>
                            ) : (
                              "Blocked"
                            )}
                          </td>
                          <td>
                            <button
                              className="userEdit"
                              onClick={() => handleEditClick(val)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className="userDelete"
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this user?"
                                  )
                                )
                                  handleDelete(e, val.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                "No data found"
              )}
            </div>
          );
        } 
      })()}
      <br />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handleChangePage}
        onShowSizeChange={handlePageSizeChange}
        showSizeChanger={true}
        pageSizeOptions={[10, 20, 50, 100]}
        style={{ textAlign: "center" }}
      />
      <br />


      <Modal
  title="Edit Record"
  open={visible}
  onCancel={() => setVisible(false)}
  footer={null}
>
  <Form>
    <div className="form-group">
      <label htmlFor="id">ID</label>
      <Input
        type="text"
        className="form-control"
        id="id"
        value={editData.id}
        disabled
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <Input
        type="text"
        className="form-control"
        id="name"
        value={editData.name}
        onChange={(e) =>
          setEditData({ ...editData, name: e.target.value })
        }
      />
    </div>
    <div className="form-group">
      <label htmlFor="name">Email</label>
      <Input
        type="text"
        className="form-control"
        id="email"
        value={editData.email}
        onChange={(e) =>
          setEditData({ ...editData, email: e.target.value })
        }
      />
    </div>
    {/* <div className="form-group">
      <label htmlFor="name">Password</label>
      <Input
        type="text"
        className="form-control"
        id="password"
        value={editData.password}
        onChange={(e) =>
          setEditData({ ...editData, password: e.target.value })
        }
      />
    </div> */}
    <div className="form-group">
      <label htmlFor="name">Phone</label>
      <Input
        type="text"
        className="form-control"
        id="phone"
        value={editData.phone}
        onChange={(e) =>
          setEditData({ ...editData, phone: e.target.value })
        }
      />
    </div>
    <br />
    <button type="submit" className="userEdit" onClick={handleSaveClick}>
      Save
    </button>
  </Form>
</Modal>

    </>
  );
}
