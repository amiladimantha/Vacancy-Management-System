import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Row, Select, message } from "antd";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

export default function AddJob() {
  useEffect(() => {
    setUserID(localStorage.getItem("id"));
  }, []);

  const defaultImageSrc =
    "https://th.bing.com/th/id/OIP.ruat7whad9-kcI8_1KH_tQHaGI?pid=ImgDet&rs=1";

  const imgdata = {
    imageSrc: defaultImageSrc,
    imageFile: null,
  };
  const [values, setValues] = useState({
    imageSrc: defaultImageSrc,
    imageFile: null,
  });

  const [form] = Form.useForm();
  const [title, setTitle] = useState();
  const [id, setUserID] = useState();
  const [description, setDescription] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setDescription(editorState.getCurrentContent().getPlainText());
  };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   const url = "https://localhost:7034/api/Job/AddJob";

  //   const data = {
  //     Title: title,
  //     //Description: editorState.getCurrentContent().getPlainText()
  //     Description: description,
  //   };
  //   axios
  //     .post(url, data)
  //     .then((result) => {
  //       const dt = result.data;
  //       alert(dt.statusMessage);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   const url = "https://localhost:7034/api/Job/AddJob";
  
  //   const formData = new FormData();
  //   formData.append("id", id);
  //   formData.append("file", selectedFile);
  //   formData.append("Title", title);
  //   formData.append("Description", description);
  //   console.log(formData);
  
  //   axios
  //     .post(url, formData)
  //     .then((result) => {
  //       const dt = result.data;
  //       alert(dt.statusMessage);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  


  const handleSave = (formValues) => {
    const formData = new FormData();
    formData.append("userId", formValues.userId);
    formData.append("Job Title", formValues["Job Title"]);
    formData.append("description", formValues.description);
    formData.append("image", setSelectedFile);
  
    axios
      .post("https://localhost:7034/api/Job/AddJob", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Job added successfully:", response.data);
        // Handle any success actions here
      })
      .catch((error) => {
        console.error("Error adding job:", error);
        // Handle any error actions here
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
        image: file,
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

  function handleImageUploadSuccess(response) {
    message.success(response);
  }

  function handleImageUploadError(error) {
    message.error(error);
  }

  return (
    <>
      <Row>
        <Form
          style={{ width: "100%" }}
          {...formItemLayout}
          form={form}
          name="ApplyLeaves"
          onFinish={(values) => {
            console.log({ values });
          }}
          scrollToFirstError
        >
          <Form.Item name="userId" label="User ID">
            <Input placeholder={id} disabled={true} />
          </Form.Item>

          <Form.Item
            name="Job Title"
            label="Job Title"
            hasFeedback
            rules={[
              {
                whitespace: true,
                min: 2,
              },
            ]}
          >
            <Input
              placeholder="Software Engineer"
              label="Job Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input a Description for the Job!",
              },
            ]}
          >
            <Input.TextArea onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
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
      </Row>
    </>
  );
}
