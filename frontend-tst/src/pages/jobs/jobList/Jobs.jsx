import React, { useEffect, useState, Component, useRef } from "react";
import "react-table-6/react-table.css";
import {
  Input,
  Form,
  Modal,
  message,
  Pagination,
  Button,
  DatePicker,
} from "antd";
import "./jobs.css";
import axios from "axios";

const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

export default function JobsList() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [type, setAccountType] = useState();
  const [editData, setEditData] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const formRef = useRef();

  const defaultImageSrc =
    "https://th.bing.com/th/id/OIP.ruat7whad9-kcI8_1KH_tQHaGI?pid=ImgDet&rs=1";

  const [values, setValues] = useState({
    imageSrc: defaultImageSrc,
    imageFile: null,
  });

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

  // const handleSaveClick = (e) => {
  //   e.preventDefault();

  //   console.log(editData);

  //   const url = "https://localhost:7034/api/Job/EditJob";

  //   axios
  //     .post(url, editData)
  //     .then((result) => {
  //       const data = result.data;
  //       console.log(data);
  //       if (data.statusCode === 200) {
  //         message.success("Job Edited Successfully");
  //       } else {
  //         message.error("Job Editing Failed");
  //       }
  //       setVisible(false);
  //     })
  //     .catch((error) => {
  //       message.error(error);
  //     });
  // };

  const handleSave = (formValues) => {
    const formData = new FormData();
    formData.append("id", editData.id);
    formData.append("creator_ID", editData.creator_ID);
    formData.append("title", editData.title);
    formData.append("description", editData.description);
    formData.append("responsibilities", editData.responsibilities);
    formData.append("requirements", editData.requirements);
    formData.append("closing_Date", editData.closing_Date.format("YYYY-MM-DD"));
    formData.append("image", selectedFile);
    console.log(formData);

    axios
      .post("https://localhost:7034/api/Job/EditJob", formData)
      .then((response) => {
        console.log(response.data);
        setVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? " invalid-field" : "";

  const showPreview = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValues({
        ...values,
        imageFile: file,
        imageSrc: reader.result,
    });
    
    };
    reader.readAsDataURL(file);
  };

  function handleFileInputChange(event) {
    console.log("handleFileInputChange triggered"); // Add this line
    setSelectedFile(event.target.files[0]);
    showPreview(event);
  }


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
                      <th
                        scope="col"
                        onClick={() => handleSortTable1("closing_Date")}
                      >
                        Closing Date {getSortArrowTable1("closing_Date")}
                      </th>
                      {/* <th
                        scope="col"
                        onClick={() => handleSortTable1("description")}
                      >
                        Description {getSortArrowTable1("description")}
                      </th> */}
                      <th scope="col" onClick={() => handleSortTable1("image")} >
                        Image {getSortArrowTable1("image")}
                      </th>
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
                          <td>{val.closing_Date}</td>
                          {/* <td>{val.description} </td> */}
                          <td>
                            <img
                              src={`data:image/png;base64,${val.image}`}
                              alt="Image"
                              style={{ maxWidth: "80px", maxHeight: "60px" }}
                            />
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
            <label htmlFor="id">
              <b>ID</b>
            </label>
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
            <label htmlFor="name">
              <b>Creator ID</b>
            </label>
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
            <label htmlFor="name">
              <b>Title</b>
            </label>
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
            <label htmlFor="name">
              <b>Description</b>
            </label>
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
            <label htmlFor="name">
              <b>Responsibilities</b>
            </label>
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
            <label htmlFor="name">
              <b>Requirements</b>
            </label>
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
          <div className="form-group">
            <label htmlFor="name">
              <b>Closing Date</b>
            </label>
            <DatePicker
              style={{ width: "100%" }}
              type="date"
              className="form-control"
              id="closing_Date"
              placeholder="Choose a Closing Date"
              selected={editData.closing_Date instanceof Date ? editData.closing_Date : new Date(editData.closing_Date)}
              onChange={(date) =>
                setEditData({ ...editData, closing_Date: date })
              }
            />
          </div>
          <br />
          <div className="form-group">
          <Form.Item
            name="image"
            label={<span className="my-class">Image</span>}
            rules={[
              {
                required: true,
                message: "Please select an image!",
              },
            ]}
          >
            <div className="image-upload">
              {values.imageSrc && (
                <img
                  src={values.imageSrc}
                  alt="Preview"
                  style={{ maxWidth: "300px", height: "200px" }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className={"form-control-file" + applyErrorClass("imageSrc")}
              />
            </div>
            <br />
          </Form.Item>
          </div>

          <br />
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleSave(form.getFieldsValue())}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
