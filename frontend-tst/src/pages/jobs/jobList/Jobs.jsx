import React, { useEffect, useState, Component } from "react";
import "react-table-6/react-table.css";
import { Input, Form, Modal, message, Pagination } from "antd";
import "./jobs.css";
import axios from "axios";

export default function JobsList() {
  const [data, setData] = useState([]);
  const [type, setAccountType] = useState();
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [image, setImage] = useState();

  useEffect(() => {
    getData();
    setAccountType(localStorage.getItem("accountType"));
  }, []);

  const getData = () => {
    const url = "https://localhost:7034/api/Job/JobList";
    axios
      .get(url, data)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listJob);
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
    const url = "https://localhost:7034/api/Job/DeleteJob";
    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if (dt.statusCode === 200) {
          message.success("Job Vacancy Deleted");
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

  const handleEditClick = (val) => {
    setEditData(val);
    setVisible(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();

    console.log(editData);

    const url = "https://localhost:7034/api/Job/EditJob";

    axios
      .post(url, editData)
      .then((result) => {
        const data = result.data;
        console.log(data);
        if (data.statusCode === 200) {
          message.success("Job Edited Successfully");
        } else {
          message.error("Job Editing Failed");
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
              <h2>Job Vacancies</h2>
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
                        onClick={() => handleSortTable1("creatorId")}
                      >
                        Creator ID {getSortArrowTable1("creatorId")}
                      </th>
                      <th scope="col" onClick={() => handleSortTable1("title")}>
                        Title {getSortArrowTable1("title")}
                      </th>
                      {/* <th
                        scope="col"
                        onClick={() => handleSortTable1("description")}
                        hidden
                      >
                        Description {getSortArrowTable1("description")}
                      </th> */}
                      {/* <th scope="col" onClick={() => handleSortTable1("image")} hidden>
                        Image {getSortArrowTable1("image")}
                      </th> */}
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
                          <td>{val.creator_ID}</td>
                          <td>{val.title}</td>
                          {/* <td>{val.description} </td> */}
                          {/* <td>
                            <img
                              src={`data:image/png;base64,${val.image}`}
                              alt="Image"
                              style={{ maxWidth: "300px", maxHeight: "200px" }}
                            />
                          </td> */}

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
                                    "Are you sure you wish to delete this record?"
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
            <label htmlFor="id"><b>ID</b></label>
            <Input
              type="text"
              className="form-control"
              id="id"
              value={editData.id}
              disabled
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="name"><b>Creator ID</b></label>
            <Input
              type="text"
              className="form-control"
              id="creator_ID"
              value={editData.creator_ID}
              disabled
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="name"><b>Title</b></label>
            <Input
              type="text"
              className="form-control"
              id="title"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="name"><b>Description</b></label>
            <Input.TextArea
              type="text"
              className="form-control"
              id="description"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              autoSize={{ minRows: 16, maxRows: 32 }}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="name"><b>Responsibilities</b></label>
            <Input.TextArea
              type="text"
              className="form-control"
              id="responsibilities"
              value={editData.responsibilities}
              onChange={(e) =>
                setEditData({ ...editData, responsibilities: e.target.value })
              }
              autoSize={{ minRows: 16, maxRows: 32 }}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="name"><b>Requirements</b></label>
            <Input.TextArea
              type="text"
              className="form-control"
              id="requirements"
              value={editData.requirements}
              onChange={(e) =>
                setEditData({ ...editData, requirements: e.target.value })
              }
              autoSize={{ minRows: 16, maxRows: 32 }}
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
