import "./edituser.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  HomeOutlined,
  UploadOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Button, Form, message, Row, Col } from "antd";
import CryptoJS from "crypto-js";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const defaultImageSrc =
  "https://th.bing.com/th/id/OIP.ruat7whad9-kcI8_1KH_tQHaGI?pid=ImgDet&rs=1";

const imgdata = {
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function EditUser() {
  const [form] = Form.useForm();

  const [values, setValues] = useState({
    imageSrc: defaultImageSrc,
    imageFile: null,
  });

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
    setUserID(localStorage.getItem("id"));
    setEmail(localStorage.getItem("email"));
    setPhone(localStorage.getItem("phone"));
    setImage(localStorage.getItem("image"));
  }, []);

  const [username, setUserName] = useState();
  const [id, setUserID] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState();

  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    const url = "https://localhost:7034/api/Profile/EditProfile";

    const data = {
      ID: id,
      Name: name,
      Phone: phone,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        message.success(dt.statusMessage);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    const url = "https://localhost:7034/api/Profile/EditProfilePassword";

    // encrypt the password
    const key = CryptoJS.enc.Utf8.parse("encryptionIntVec");
    const iv = CryptoJS.enc.Utf8.parse("aesEncryptionKey");
    const encryptedPassword = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(password),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();

    const data = {
      ID: id,
      Password: encryptedPassword,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        alert(dt.statusMessage);
        alert(
          "You will be logged out. Please Login again with the new Password"
        );
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.clear();
    window.location.href = "/";
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    const url = "https://localhost:7034/api/Profile/EditProfileEmail";
    const data = {
      ID: id,
      Email: email,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        alert(dt.statusMessage);
        alert("You will be logged out. Please Login again with the new Email");
      })
      .catch((error) => {
        message.error(error);
      });

    localStorage.clear();
    window.location.href = "/";
  };

  const validate = () => {
    let temp = {};
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  function handleSaveImage(id, imageFile) {
    console.log("handleSaveImage triggered"); // Add this line
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", imageFile);
  
    console.log(formData.get("id"));
    console.log(formData);
  
    axios
    .post("https://localhost:7034/api/Profile/EditProfileImage", formData)
    .then((result) => {
      const data = result.data;
      console.log(data);
      if (data.statusCode === 200) {
        message.success("Image Uploaded Successfully");
      } else {
        message.error("Image Uploading Failed");
      }
    })
  }
  
  

//const [selectedFile, setSelectedFile] = useState(null);

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

function handleSubmit(event) {
console.log("handleSubmit triggered"); // Add this line
console.log(id);
event.preventDefault();
handleSaveImage(id, selectedFile);
}

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

  function DetailsSubmit() {
    if (name && email && phone) {
      return (
        <Button type="primary" htmlType="submit" onClick={(e) => handleSave(e)}>
          Update
        </Button>
      );
    } else {
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleSave(e)}
        disabled={true}
      >
        Update
      </Button>;
    }
  }

  function PasswordSubmit() {
    if (password === repassword) {
      return (
        <Button
          type="primary"
          htmlType="submit"
          onClick={(e) => handleSavePassword(e)}
        >
          Update
        </Button>
      );
    } else {
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleSavePassword(e)}
        disabled={true}
        placeholder="button"
      >
        Update
      </Button>;
    }
  }

  function EmailSubmit() {
    if (email) {
      return (
        <Button
          type="primary"
          htmlType="submit"
          onClick={(e) => handleSaveEmail(e)}
        >
          Update
        </Button>
      );
    } else {
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleSaveEmail(e)}
        disabled={true}
        placeholder="button"
      >
        Update
      </Button>;
    }
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={`data:image/png;base64,${image}`}
                alt=""
                className="userShowImage"
              />
              <div className="userShowTopTitle">
                <span className="userShowUserNAme">UserID : {id}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Details</span>
              <div className="userShowInfo">
                <UserOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label htmlFor="">{username}</label>
                </span>
              </div>
              
              <div className="userShowInfo">
                <MailOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label htmlFor="">{email}</label>
                </span>
              </div>
              <div className="userShowInfo">
                <PhoneOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">
                  <label htmlFor="">{phone}</label>
                </span>
              </div>
              
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit Details</span>
            <br />
            <Form
              {...formItemLayout}
              form={form}
              name="editProfile"
              onFinish={(values) => {
                console.log({ values });
              }}
              scrollToFirstError
            >
              <Form.Item
                name="Username"
                label="Username"
                hasFeedback
                rules={[
                  {
                    type: "name",
                    message: "The input is not valid Name!",
                  },
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                  {
                    whitespace: true,
                    min: 3,
                  },
                ]}
              >
                <Input
                  placeholder="Jon"
                  label="UserName"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>

              {/* <Form.Item
              name="email"
              label="E-mail"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                placeholder="something@gmail.com"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item> */}

              <Form.Item
                name="phone"
                label="Phone Number"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                  {
                    pattern: /^(?:7|0|(?:\+94))[0-9]{9}$/,
                    message: "Phone number is not valid!",
                  },
                ]}
              >
                <Input
                  placeholder="0775680041"
                  label="Phone"
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Item>

              

              <Form.Item {...tailFormItemLayout}>
                <DetailsSubmit />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit Password</span>
            <Form
              {...formItemLayout}
              form={form}
              name="edit-password"
              onFinish={(values) => {
                console.log({ values });
              }}
              scrollToFirstError
            >
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    required: true,
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Password does not match criteria! (Must have 8 characters, include numbers, simple letters, capital letters)",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <PasswordSubmit />
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit Email</span>
            <Form
              {...formItemLayout}
              form={form}
              name="edit-email"
              onFinish={(values) => {
                console.log({ values });
              }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="something@gmail.com"
                  label="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <EmailSubmit />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={12}>
          <div className="userShow">
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                {values.imageSrc && (
                  <img
                    src={values.imageSrc}
                    alt="Preview"
                    style={{ maxWidth: "40%", height: "40%" }}
                  />
                )}

                {/* <label htmlFor="file">
                <UploadOutlined className="userUpdateIcon" />
              </label> */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className={"form-control-file" + applyErrorClass("imageSrc")}
                />
              </div>
              <br />
              <br />
              <Button
                className="userUpdateButton"
                type="primary"
                htmlType="submit"
                onClick={handleSubmit}
              >
                Upload Image
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}



// import React, { useState,useEffect } from "react";
// import axios from "axios";



// export default function EditUser() {

//   const[id,setUserID] = useState();
//   useEffect(() => {
//         setUserID(localStorage.getItem("id"));
//       }, []);

//       function handleSaveImage(id, imageFile) {
//         console.log("handleSaveImage triggered"); // Add this line
//         const formData = new FormData();
//         formData.append("id", id);
//         formData.append("image", imageFile);
      
//         console.log(formData.get("id"));
//         console.log(formData);
      
//         axios
//           .post("https://localhost:7046/api/Profile/EditProfileImage", formData)
//           .then((response) => {
//             // handle success
//             console.log(response);
//           })
//           .catch((error) => {
//             // handle error
//             console.log(error);
//           });
//       }
      
      

//   const [selectedFile, setSelectedFile] = useState(null);

//   function handleFileInputChange(event) {
//     console.log("handleFileInputChange triggered"); // Add this line
//     setSelectedFile(event.target.files[0]);
//   }
  

//   function handleSubmit(event) {
//     console.log("handleSubmit triggered"); // Add this line
//     console.log(id);
//     event.preventDefault();
//     handleSaveImage(id, selectedFile);
//   }
  

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" name="image" onChange={handleFileInputChange} />
//       <button type="submit">Save Image</button>
//     </form>
//   );
// }
