import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
import Encryption from "./Encryption";
import { Button, Col, Form, Input, Row, Select } from "antd";


const { Option } = Select;

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

export default function Register() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [type, setAccountType] = useState();

  const handleSave = (e) => {
    e.preventDefault();
    const url = "https://localhost:7034/api/User/Registration";

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
        Name: name,
        Email: email,
        Password: encryptedPassword,
        Phone: phone,
        Address:'',
        Birthday:'',
        AccountType: type,
    };

    console.log(type);
    axios
        .post(url, data)
        .then((result) => {
            const dt = result.data;
            alert(dt.statusMessage);
        })
        .catch((error) => {
            console.log(error);
        });
};

  return (
    <>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <h1>Register</h1>
          <br />
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
      </Row>
      <br></br>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 2, offset: 2 }}></Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
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
                  message: "The input is not a valid Name!",
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
                placeholder="Samuel"
                label="UserName"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

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
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
                {
                  required: true,
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

            <Form.Item
              name="type"
              label="Account Type"
              rules={[
                {
                  required: true,
                  message: "Please select an Account Type!",
                },
              ]}
            >
              <Select
                label="Phone"
                placeholder="Select Account Type"
                onChange={(value) => setAccountType(value)}
              >
                <Select.Option disabled={true} value={0}>Admin</Select.Option>
                <Select.Option value={1}>Manager</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={(e) => handleSave(e)}
              >
                Register
              </Button>
              {" "}Or{" "}
              <a href="/" element={<Login />}>
                <b>Login</b>
              </a>
            </Form.Item>
          </Form>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 2, offset: 2 }}></Col>
      </Row>
    </>
  );
}
