import React, { useEffect, useState } from "react";
import { Carousel, Card, message, Modal, Input, Form, Button } from "antd";
import "./landing-jobs.css";
import axios from "axios";

const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 5 },
};

const LandingJobs = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editData, setEditData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const url = "https://localhost:7034/api/Job/JobList";
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listJob);
          // Extract the images from the job data
          const jobImages = data.listJob.map((job) => job.image);
          setImages(jobImages);
        }
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSave = (formValues) => {
    const formData = new FormData();
    formData.append("id", editData.id);
    formData.append("name", editData.name);
    formData.append("email", editData.email);
    formData.append("phone", editData.phone);
    formData.append("national_ID", editData.national_ID);
    formData.append("cv", selectedFile);
    console.log(formData);

    axios
      .post("https://localhost:7034/api/Applicant/JobApplication", formData)
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

  function handleFileInputChange(event) {
    console.log("handleFileInputChange triggered"); // Add this line
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div className="body">
      <h1 style={{ paddingBottom: "40px", textAlign: "center" }}>
        Available Vacancies
      </h1>
      <div>
        <div className="img-slider">
          <Carousel autoplay={{ delay: 5000, pauseOnHover: true }}>
            {images.map((image) => (
              <div key={image} className="slider-image">
                <img src={`data:image/png;base64,${image}`} alt="job" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="description-job">
          <h2>Are you Dedicated, Hardworking, and Fun? Join Us!</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusaum doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem. beatae vitae dicta sunt explicabo. Nemo
            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem.
          </p>
        </div>

        <div className="landing-card">
          {data.map((job) => (
            <Card
              key={job.id}
              hoverable
              style={{ width: 300, margin: "0 20px 20px 20px" }}
              cover={
                <img
                  alt="card-image"
                  src={`data:image/png;base64,${job.image}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
              onClick={() => handleCardClick(job)}
            >
              <Card.Meta
                title={job.title}
                description={<div>Closing date: {job.closing_Date}</div>}
              />
            </Card>
          ))}
        </div>

        <Modal
          className="form-job"
          title={selectedJob ? selectedJob.title : ""}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {selectedJob ? (
            <div>
              <label>
                <b>Job Description</b>
              </label>
              <ul>{selectedJob.description}</ul>
              <br />
              <label>
                <b>Job Responsibilities</b>
              </label>
              <ul>{selectedJob.responsibilities}</ul>
              <br />
              <label>
                <b>Job Requirements</b>
              </label>
              <ul>{selectedJob.requirements}</ul>
              <br />
              <p>
                <b>Closing date:</b> {selectedJob.closing_Date}
              </p>
            </div>
          ) : null}
          <br />
          <br />

          <br />
          <h2>Apply Now!</h2>
          <br />

          <div>
            <Form>
              <div className="form-group">
                <label htmlFor="name">
                  <b>Name</b>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="email">
                  <b>Email</b>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="email"
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="phone">
                  <b>Phone</b>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="phone"
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="national_ID">
                  <b>National ID</b>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  id="national_ID"
                  onChange={(e) =>
                    setEditData({ ...editData, national_ID: e.target.value })
                  }
                />
              </div>
              <br />
              <div className="form-group">
                <Form.Item
                  name="image"
                  label={<span className="my-class">CV</span>}
                  rules={[
                    {
                      required: true,
                      message: "Please select a CV!",
                    },
                  ]}
                >
                  <div className="image-upload">
                    <br />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className={
                        "form-control-file" + applyErrorClass("imageSrc")
                      }
                    />
                  </div>
                  <br />
                </Form.Item>
              </div>

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
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LandingJobs;
