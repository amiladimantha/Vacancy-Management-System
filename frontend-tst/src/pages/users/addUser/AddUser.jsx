import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import CryptoJS from "crypto-js";

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
};
const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};


export default function AddUser() {
  useEffect(() => {
    setUserName(localStorage.getItem("username"));
    setUserID(localStorage.getItem("id"));
  }, []);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    // console.log("Received values of form: ", values, id, username);
  };

  const [username, setUserName] = useState();
  const [id, setUserID] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [days, setNoofDays] = useState();
  const [leaveType, setLeaveType] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [type, setAccountType] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState();
  const [isApproved, setIsApproved] = useState();

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
           padding: CryptoJS.pad.Pkcs7
       }
   ).toString();

  const handleSave = (e) => {
    e.preventDefault();
    const url = "https://localhost:7034/api/User/AddUser";

    const data = {
      Name: name,
      Email: email,
      Password: encryptedPassword,
      Phone: phone,
      Address:address,
      Birthday:dob,
      AccountType: type,
      isApproved: isApproved,
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
          <Form.Item
              name="Username"
              label={<span className="my-class">Username</span>}
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
              label={<span className="my-class">Email</span>}
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
              label={<span className="my-class">Password</span>}
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
              label={<span className="my-class">Confirm Password</span>}
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
              label={<span className="my-class">Phone</span>}
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
              label={<span className="my-class">Account Type</span>}
              rules={[
                {
                  required: true,
                  message: "Please select an Account Type!",
                },
              ]}
            >
              <Select
                label="Type"
                placeholder="Select Account Type"
                onChange={(value) => setAccountType(value)}
              >
                <Select.Option disabled={true} value={0}>Admin</Select.Option>
                <Select.Option value={1}>Manager</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="isApproved"
              label={<span className="my-class">Is Approved</span>}
              rules={[
                {
                  required: true,
                  message: "Please select Approved account or Not!",
                },
              ]}
            >
              <Select
                label="Is Approved"
                placeholder="Select Approved or Not"
                onChange={(value) => setIsApproved(value)}
              >
                <Select.Option value={1}>Yes</Select.Option>
                <Select.Option value={0}>No</Select.Option>
              </Select>
            </Form.Item>
            

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => handleSave(e)}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}
