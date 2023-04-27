import React, { useState } from "react";
import axios from "axios";
import Component from "./index";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Checkbox, message } from "antd";
import Encryption from "./Encryption";

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

export default function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [id, setID] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    const url = "https://localhost:7034/api/User/Login";

    // encrypt the password
    // const key = CryptoJS.enc.Utf8.parse("encryptionIntVec");
    // const iv = CryptoJS.enc.Utf8.parse("aesEncryptionKey");
    // const encryptedPassword = CryptoJS.AES.encrypt(
    //     CryptoJS.enc.Utf8.parse(password),
    //     key,
    //     {
    //         keySize: 128 / 8,
    //         iv: iv,
    //         mode: CryptoJS.mode.CBC,
    //         padding: CryptoJS.pad.Pkcs7
    //     }
    // ).toString();

    const encryptedPassword = Encryption.encrypt(password);

    const data = {
      ID: id,
      Email: email,
      Password: encryptedPassword,
    };

    console.log(encryptedPassword)

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        if(dt.registration.isApproved === 1){
          if(dt.registration.isActive === 1){
            if (dt.registration.accountType === 0) {
              localStorage.setItem("username", dt.registration.name);
              localStorage.setItem("id", dt.registration.id);
              localStorage.setItem("email", dt.registration.email);
              localStorage.setItem("phone", dt.registration.phone);            
              localStorage.setItem("accountType",dt.registration.accountType);
              localStorage.setItem("image",dt.registration.image);
              navigate("/users/admin");
              message.success("Admin user Login successful");
            } else {
              localStorage.setItem("email", dt.registration.email);
              localStorage.setItem("username", dt.registration.name);
              localStorage.setItem("id", dt.registration.id);          
              localStorage.setItem("phone", dt.registration.phone);                      
              localStorage.setItem("accountType",dt.registration.accountType);
              localStorage.setItem("image",dt.registration.image);
              if(dt.registration.accountType === 1){
                navigate("/users/manager")
                message.success("Login successful");
              }            
              else{
              localStorage.setItem("email", dt.registration.email);
              localStorage.setItem("username", dt.registration.name);
              localStorage.setItem("id", dt.registration.id);          
              localStorage.setItem("phone", dt.registration.phone);                      
              localStorage.setItem("accountType",dt.registration.accountType);
              localStorage.setItem("image",dt.registration.image);
              navigate("/users/staff")
              message.success("Login successful");
              }            
            }
          }else{
            if(dt.registration.accountType === 1){
              message.warning("Your account has been blocked by the Admin!");
            }
            else{
              message.warning("Your account has been blocked the Admin or by Managers!");
            }
          }
        }
        else{
          message.warning("Your account has not been approved yet, Please wait till a manger or the admin approves it!");
        }
      })
      .catch((error) => {
        message.error("Email or password incorrect, Please Check again!");
      });
  };

  return (
    <>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <h1>Login</h1>
          <br />
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
      </Row>
      <br></br>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}></Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Form
            {...formItemLayout}
            form={form}
            name="login"
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
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
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

            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={(e) => handleLogin(e)}
              >
                Log in
              </Button>
              {" "}Or{" "}
              <a href="/register" element={<Component.Register />}>
                <b>Create Account!</b>
              </a>
            </Form.Item>

          </Form>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
      </Row>
    </>
  );
}
