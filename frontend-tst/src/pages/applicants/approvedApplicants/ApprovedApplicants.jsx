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
import "./approvedApplicants.css";
import axios from "axios";

export default function ApprovedApplicants() {
  const [data, setData] = useState([]);
  const [type, setAccountType] = useState();
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const accountTypes = ["Manager", "Staff"];
  const approved = ["No", "Yes"];
  const hired = ["No", "Yes"];

  useEffect(() => {
    getData();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7034/api/Applicant/ApprovedApplicantList";
    axios
      .get(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listApprovedApplicant);
        }
      })
      .catch((error) => {
        message.error(error);
      });
    console.log("Array data", data);
  };

  const handleReject = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7034/api/Applicant/RejectHire";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("Applicant Rejected");
          getData();
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };


  const handleHire = (e, id) => {
    const data = {
      ID: id,
    };
    const url = "https://localhost:7034/api/Applicant/HireApplicant";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("Hired");
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
  
  


  const handleMeetingClick = (val) => {
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
              <h2>Approved Applicants</h2>
              {currentData ? (
                <table className="datatable">
                  <thead>
                    <tr>
                      <th scope="col" style={{ borderTopLeftRadius: "20px" }} onClick={() => handleSortTable1("id")}>
                        ID {getSortArrowTable1("id")}
                      </th>
                      <th scope="col"  onClick={() => handleSortTable1("job_ID")}>
                        Job ID {getSortArrowTable1("job_ID")}
                      </th>
                      <th scope="col"  onClick={() => handleSortTable1("approvers_ID")}>
                        Approvers ID {getSortArrowTable1("approvers_ID")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("name")}>
                        Name {getSortArrowTable1("name")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("email")}>
                        Email {getSortArrowTable1("email")}
                      </th>                     
                      <th scope="col" onClick={() => handleSortTable1("phone")}>
                        Phone {getSortArrowTable1("phone")}
                      </th>   
                      <th scope="col" onClick={() => handleSortTable1("national_ID")}>
                        National ID {getSortArrowTable1("national_ID")}
                      </th>                   
                      <th scope="col" onClick={() => handleSortTable1("hired")}>
                        Hired {getSortArrowTable1("hired")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("isApproved")}>
                        Is Approved {getSortArrowTable1("isApproved")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("meeting_Date")}>
                        Meeting Date {getSortArrowTable1("meeting_Date")}
                      </th>
                      <th scope="col">CV</th>
                      <th scope="col">Meeting Date and Time</th>
                      <th scope="col">Hire</th>
                      <th scope="col">Reject</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((val, index) => {
                      return (
                        <tr>
                          <td>{val.id}</td>
                          <td>{val.job_ID}</td>
                          <td>{val.approvers_ID}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>{val.phone}</td>
                          <td>{val.national_ID}</td>
                          <td>{hired[val.hired]}</td>
                          <td>{approved[val.isApproved]}</td>
                          <td>{val.meeting_Date}</td>
                          <td>
  <a href={`data:application/pdf;base64,${val.cv}`} download="cv.pdf">
    Download CV
  </a>
</td>
                          <td>
                            <button
                              className="userEdit"
                              onClick={() => handleMeetingClick(val)}
                            >
                              Create
                            </button>
                          </td>
                          <td>
                            {val.hired === 0 ? (
                              <button
                                className="userApprove"
                                onClick={(e) => handleHire(e, val.id)}
                              >
                                Hire
                              </button>
                            ) : (
                              "Hired"
                            )}
                          </td>
                          <td>
                            {val.hired === 1 ? (
                              <button
                                className="userDelete"
                                onClick={(e) => handleReject(e, val.id)}
                              >
                                Reject
                              </button>
                            ) : (
                              "Rejected"
                            )}
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
