import React, { useEffect, useState } from "react";
import { Row, Col, Card, message } from "antd";
import axios from "axios";
import "./home.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [dataa, setDataa] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);

  useEffect(() => {
    getData();
    getDataA();
  }, []);

  const getData = () => {
    const url = "https://localhost:7034/api/Job/JobList";
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        if (data.statusCode === 200) {
          setData(data.listJob);
          const jobTitles = data.listJob.map(
            (job) => `${job.title} (${job.closing_Date})`
          );
          setJobTitles(jobTitles);
        }
      })
      .catch((error) => {
        message.error(error);
      });
    console.log(data);
    console.log("title and date", jobTitles);
  };

  const getDataA = () => {
    const url = "https://localhost:7034/api/Applicant/ApplicantList";
    axios
      .get(url, dataa)
      .then((result) => {
        const dataa = result.data;
        if (dataa.statusCode === 200) {
          setDataa(dataa.listApplicant);
        }
      })
      .catch((error) => {
        message.error(error);
      });
    console.log("Array dataa", dataa);
  };

  const jobCount = [...new Set(data.map((val) => val.id))].length;
  const approvedApplicantsCount = dataa
    .filter((val) => val.isApproved === 1)
    .map((val) => val.id).length;
  const rejectedApplicantsCount = dataa
    .filter((val) => val.isApproved === 0)
    .map((val) => val.id).length;
  const hiredApplicantsCount = dataa
    .filter((val) => val.hired === 1)
    .map((val) => val.id).length;
    const totalApplicantsCount = [...new Set(dataa.map((val) => val.id))].length;

  return (
    <>
      <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="info-card-4" title="Hired Applicants">
            <p style={{ fontSize: "44px" }}>{hiredApplicantsCount}</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="info-card-2" title="Approved Applicants">
            <p style={{ fontSize: "44px" }}>{approvedApplicantsCount}</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="info-card-3" title="Rejected Applicants">
            <p style={{ fontSize: "44px" }}>{rejectedApplicantsCount}</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="info-card-7" title="Total Applicants">
            <p style={{ fontSize: "44px" }}>{totalApplicantsCount}</p>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="info-card-1" title="Jobs Created">
            <p style={{ fontSize: "44px" }}>{jobCount}</p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6}>
          <Card className="info-card-6" title="Closed Jobs">
            <p style={{ fontSize: "44px" }}>0</p>
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={24} lg={12}>
        <Card className="info-card-5" title="Jobs">
          <ul>
            {jobTitles.map((title) => {
              const [jobTitle, closingDate] = title.split(" (");
              return (
                <li className="job-title table-row" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span><b>{jobTitle}</b></span>
                  <span>Closing Date - ({closingDate}</span>
                </li>
              );
            })}
          </ul>
        </Card>
      </Col>
      </Row>
      <br />

      <Row>
      
    </Row>
    </>
  );
}
