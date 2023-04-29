import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Form, Input, Row, Select, message } from "antd";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./addJob.css";

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

  const formRef = useRef();

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

  useEffect(() => {
    formRef.current.setFieldsValue({
      image: values.imageFile,
    });
  }, [values.imageFile]);

  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [id, setUserID] = useState();
  const [description, setDescription] = useState();
  const [responsibilities, setResponsibilities] = useState();
  const [requirements, setRequirements] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setDescription(editorState.getCurrentContent().getPlainText());
  };

  const handleSave = (formValues) => {
    const formData = new FormData();
    formData.append("creator_Id", id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("responsibilities", responsibilities);
    formData.append("requirements", requirements);
    formData.append("image", selectedFile);

    axios
      .post("https://localhost:7034/api/Job/AddJob", formData)
      .then((result) => {
        const data = result.data;
        console.log(data);
        if (data.statusCode === 200) {
          message.success("Job Added Successfully");
        } else {
          message.error("Job Addition Failed");
        }
      })
      .catch((error) => {
        message.error(error);
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

  function handleImageUploadSuccess(response) {
    message.success(response);
  }

  function handleImageUploadError(error) {
    message.error(error);
  }

  return (
    <>
      <Row>
        <Form ref={formRef}
          style={{ width: "100%" }}
          {...formItemLayout}
          form={form}
          name="ApplyLeaves"
          onFinish={(values) => {
            console.log({ values });
          }}
          scrollToFirstError
        >
          <Form.Item name="userId" label={<span className="my-class">User ID</span>}>
            <Input placeholder={id} disabled={true} />
          </Form.Item>

          <Form.Item
            name="jobTitle"
            label={<span className="my-class">Job Title</span>}
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
              name="jobTitle"
              label="Job Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="my-class">Description</span>}
            rules={[
              {
                required: true,
                message: "Please input a Description for the Job!",
              },
            ]}
          >
            <Input.TextArea onChange={(e) => setDescription(e.target.value)} autoSize={{ minRows: 16, maxRows: 32 }}  />
          </Form.Item>

          <Form.Item
            name="responsibilities"
            label={<span className="my-class">Responsibilities</span>}
            rules={[
              {
                required: true,
                message: "Please fill in the Responsibilities of the Job!",
              },
            ]}
          >
            <Input.TextArea
              onChange={(e) => setResponsibilities(e.target.value)}
              autoSize={{ minRows: 16, maxRows: 32 }}
            />
          </Form.Item>

          <Form.Item
            name="requirements"
            label={<span className="my-class">Requirements</span>}
            rules={[
              {
                required: true,
                message: "Please fill in the eRequirements for the Job!",
              },
            ]}
          >
            <Input.TextArea onChange={(e) => setRequirements(e.target.value)}
            autoSize={{ minRows: 16, maxRows: 32 }} />
          </Form.Item>

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
