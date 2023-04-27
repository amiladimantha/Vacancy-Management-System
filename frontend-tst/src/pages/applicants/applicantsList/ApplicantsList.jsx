import React, { useEffect, useState, Component } from "react";
import "react-table-6/react-table.css";
import Decryption from "../../../Component/Decryption";
import { Input, Form, Modal, message, Pagination } from "antd";
import "./applicantsList.css";
import axios from "axios";

export default function ApplicantsList() {
  const [data, setData] = useState([]);
  const [type, setAccountType] = useState();
  const [approvers_ID, setID] = useState();
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const accountTypes = ["Manager", "Staff"];
  const approved = ["No", "Yes", "Pending"];
  const active = ["No", "Yes"];

  useEffect(() => {
    getData();
    setID(localStorage.getItem("id"));
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7034/api/Applicant/ApplicantList";
    axios
      .get(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listApplicant);
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
      Approvers_ID: approvers_ID,
    };
    const url = "https://localhost:7034/api/Applicant/RejectApplicant";
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

  const handleApprove = (e, id) => {
    const data = {
      ID: id,
      Approvers_ID: approvers_ID,
    };
    const url = "https://localhost:7034/api/Applicant/ApproveApplicant";
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
      sortByTable1.column === column && sortByTable1.order === "asc"
        ? "desc"
        : "asc";
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

  return (
    <>
      {(() => {
        if (type === "0") {
          return (
            <div>
              <h2>Applicants</h2>
              {currentData ? (
                <table className="datatable">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ borderTopLeftRadius: "20px" }}
                        onClick={() => handleSortTable1("id")}
                      >
                        ID {getSortArrowTable1("id")}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSortTable1("job_ID")}
                      >
                        Job ID {getSortArrowTable1("job_ID")}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSortTable1("approvers_ID")}
                      >
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
                      <th
                        scope="col"
                        onClick={() => handleSortTable1("national_ID")}
                      >
                        National ID {getSortArrowTable1("national_ID")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("hired")}>
                        Hired {getSortArrowTable1("hired")}
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSortTable1("isApproved")}
                      >
                        Is Approved {getSortArrowTable1("isApproved")}
                      </th>

                      <th scope="col">CV</th>
                      <th scope="col">Approve</th>
                      <th scope="col">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((val, index) => {
                      return (
                        <tr>
                          <td>{val.id}</td>
                          <td>{val.job_ID}</td>
                          <td>{val.approvers_ID === 0 ? "Not Approved Yet" : val.approvers_ID}</td>
                          <td>{val.name}</td>
                          <td>{val.email}</td>
                          <td>{val.phone}</td>
                          <td>{val.national_ID}</td>
                          <td>{val.hired}</td>
                          <td>{approved[val.isApproved]}</td>
                          <td>
                            <a
                              href={`data:application/pdf;base64,${val.cv}`}
                              download="cv.pdf"
                            >
                              Download CV
                            </a>
                          </td>

                          <td>
                            {val.isApproved != 1 ? (
                              <button
                                className="userApprove"
                                onClick={(e) => handleApprove(e, val.id)}
                              >
                                Approve
                              </button>
                            ) : (
                              "Approved"
                            )}
                          </td>
                          <td>
                            {val.isApproved != 0 ? (
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
    </>
  );
}
