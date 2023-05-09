import React, { useEffect, useState, useRef } from "react";
import "react-table-6/react-table.css";
import {
  Input,
  Form,
  Modal,
  message,
  Button
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
  };

  const handleEditClick = (val) => {
    setEditData(val);
    setVisible(true);
  };

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
                      
                      <th scope="col" onClick={() => handleSortTable1("title")}>
                        Title {getSortArrowTable1("title")}
                      </th>
                     
                     
                      <th scope="col" onClick={() => handleSortTable1("image")} >
                        Image {getSortArrowTable1("image")}
                      </th>
                      <th scope="col">Edit</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((val, index) => {
                      return (
                        <tr>
                          <td>{val.id}</td>
                          
                          <td>{val.title}</td>
                          
                          
                          <td>
                            <img
                              src={`data:image/png;base64,${val.image}`}
                              alt="Image"
                              style={{ maxWidth: "300px", maxHeight: "200px" }}
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
