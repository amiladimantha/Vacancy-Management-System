using Microsoft.AspNetCore.Mvc;
using System.Data;
using VMS.Library;

namespace VMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : BaseController
    {
        public ApplicantController(IConfiguration configuration) : base(configuration)
        {
        }

        [HttpGet]
        [Route("ApplicantList")]
        public Response ApplicantList()
        {

            Response response = new Response();
            DataTable dt = dataAccess.ApplicantList();

            List<ApplicantList> lstApplicant = new List<ApplicantList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    ApplicantList al = new ApplicantList();
                    al.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    al.Job_ID = Convert.ToInt32(dt.Rows[i]["Job_ID"]);
                    al.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    al.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    al.Phone = Convert.ToString(dt.Rows[i]["Phone"]);
                    al.National_ID = Convert.ToString(dt.Rows[i]["Name"]);
                    al.Hired = Convert.ToInt32(dt.Rows[i]["Hired"]);
                    al.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    al.Meeting_Date = Convert.ToString(dt.Rows[i]["Meeting_Date"]);
                    if (dt.Rows[i]["Approvers_ID"] != DBNull.Value)
                    {
                        al.Approvers_ID = Convert.ToInt32(dt.Rows[i]["Approvers_ID"]);
                    }
                    else
                    {
                        al.Approvers_ID = 0; // or whatever default value you want to use
                    }

                    if (dt.Rows[0]["CV"] != null && !string.IsNullOrEmpty(dt.Rows[0]["CV"].ToString()))
                    {
                        if (dt.Rows[0]["CV"] is byte[])
                        {
                            al.CV = (byte[])dt.Rows[0]["CV"];
                        }
                        else if (dt.Rows[0]["CV"] is string)
                        {
                            al.CV = Convert.FromBase64String(dt.Rows[0]["CV"].ToString());
                        }
                        else
                        {
                            al.CV = null;
                        }
                    }
                    else
                    {
                        al.CV = null;
                    }
                    lstApplicant.Add(al);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listApplicant = lstApplicant;

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listApplicant = null;

            }
            return response;

        }

        [HttpGet]
        [Route("ApprovedApplicantList")]
        public Response ApprovedApplicantList()
        {

            Response response = new Response();
            DataTable dt = dataAccess.ApprovedApplicantList();

            List<ApprovedApplicantList> lstApprovedApplicant = new List<ApprovedApplicantList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    ApprovedApplicantList aal = new ApprovedApplicantList();
                    aal.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    aal.Job_ID = Convert.ToInt32(dt.Rows[i]["Job_ID"]);
                    aal.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    aal.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    aal.Phone = Convert.ToString(dt.Rows[i]["Phone"]);
                    aal.National_ID = Convert.ToString(dt.Rows[i]["Name"]);
                    aal.Hired = Convert.ToInt32(dt.Rows[i]["Hired"]);
                    aal.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    aal.Meeting_Date = Convert.ToString(dt.Rows[i]["Meeting_Date"]);
                    if (dt.Rows[i]["Approvers_ID"] != DBNull.Value)
                    {
                        aal.Approvers_ID = Convert.ToInt32(dt.Rows[i]["Approvers_ID"]);
                    }
                    else
                    {
                        aal.Approvers_ID = 0; // or whatever default value you want to use
                    }

                    if (dt.Rows[0]["CV"] != null && !string.IsNullOrEmpty(dt.Rows[0]["CV"].ToString()))
                    {
                        if (dt.Rows[0]["CV"] is byte[])
                        {
                            aal.CV = (byte[])dt.Rows[0]["CV"];
                        }
                        else if (dt.Rows[0]["CV"] is string)
                        {
                            aal.CV = Convert.FromBase64String(dt.Rows[0]["CV"].ToString());
                        }
                        else
                        {
                            aal.CV = null;
                        }
                    }
                    else
                    {
                        aal.CV = null;
                    }
                    lstApprovedApplicant.Add(aal);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listApprovedApplicant = lstApprovedApplicant;

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listApprovedApplicant = null;

            }
            return response;

        }

        [HttpGet]
        [Route("HiredApplicantList")]
        public Response HiredApplicantList()
        {

            Response response = new Response();
            DataTable dt = dataAccess.HiredApplicantList();

            List<HiredApplicantList> lstHiredApplicant = new List<HiredApplicantList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    HiredApplicantList hal = new HiredApplicantList();
                    hal.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    hal.Job_ID = Convert.ToInt32(dt.Rows[i]["Job_ID"]);
                    hal.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    hal.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    hal.Phone = Convert.ToString(dt.Rows[i]["Phone"]);
                    hal.National_ID = Convert.ToString(dt.Rows[i]["Name"]);
                    hal.Hired = Convert.ToInt32(dt.Rows[i]["Hired"]);
                    hal.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    hal.Meeting_Date = Convert.ToString(dt.Rows[i]["Meeting_Date"]);
                    if (dt.Rows[i]["Approvers_ID"] != DBNull.Value)
                    {
                        hal.Approvers_ID = Convert.ToInt32(dt.Rows[i]["Approvers_ID"]);
                    }
                    else
                    {
                        hal.Approvers_ID = 0; // or whatever default value you want to use
                    }

                    if (dt.Rows[0]["CV"] != null && !string.IsNullOrEmpty(dt.Rows[0]["CV"].ToString()))
                    {
                        if (dt.Rows[0]["CV"] is byte[])
                        {
                            hal.CV = (byte[])dt.Rows[0]["CV"];
                        }
                        else if (dt.Rows[0]["CV"] is string)
                        {
                            hal.CV = Convert.FromBase64String(dt.Rows[0]["CV"].ToString());
                        }
                        else
                        {
                            hal.CV = null;
                        }
                    }
                    else
                    {
                        hal.CV = null;
                    }
                    lstHiredApplicant.Add(hal);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listHiredApplicant = lstHiredApplicant;

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listHiredApplicant = null;

            }
            return response;

        }


        [HttpPost]
        [Route("JobApplication")]
        public Response JobApplication([FromForm] int job_Id,[FromForm] string name, [FromForm] string email, [FromForm] string phone, [FromForm] string national_Id,  IFormFile cv)
        {
            Response response = new Response();

            try
            {

                if (cv == null || cv.Length == 0)
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Please input your CV.";
                    return response;
                }

                // Convert cv to byte array
                byte[] cvBytes;
                using (var memoryStream = new MemoryStream())
                {
                    cv.CopyTo(memoryStream);
                    cvBytes = memoryStream.ToArray();
                }

                // Save cv bytes to database
                bool ret = dataAccess.JobApplication(job_Id,name, email, phone, national_Id, cvBytes);

                if (ret)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Application Submitted Successfully!";
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Application Submission failed!";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.StatusMessage = "An error occurred while submitting application.";
            }

            return response;
        }
     

        [HttpPost]
        [Route("ApproveApplicant")]
        public Response ApproveApplicant(ApproveApplicant approveApplicant)
        {
            Response response = new Response();
            bool ret = dataAccess.ApproveApplicant(approveApplicant);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Applicant Approved Successfully!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Applicant Approval Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("RejectApplicant")]
        public Response RejectApplicant(RejectApplicant rejectApplicant)
        {
            Response response = new Response();
            bool ret = dataAccess.RejectApplicant(rejectApplicant);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Applicant Rejected Successfully!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Applicant Rejection Failed!";
            }
            return response;
        }
        [HttpPost]
        [Route("RejectHire")]
        public Response RejectHire(RejectHire rejectHire)
        {
            Response response = new Response();
            bool ret = dataAccess.RejectHire(rejectHire);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Applicant Rejected Successfully!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Applicant Rejection Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("HireApplicant")]
        public Response HireApplicant(HireApplicant hireApplicant)
        {
            Response response = new Response();
            bool ret = dataAccess.HireApplicant(hireApplicant);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Applicant Hired!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Status Change Failed!";
            }
            return response;
        }

        //[HttpPost]
        //[Route("DeleteUser")]
        //public Response DeleteUser(DeleteUser deleteUser)
        //{
        //    Response response = new Response();
        //    bool ret = dataAccess.DeleteUser(deleteUser);

        //    if (ret)
        //    {
        //        response.StatusCode = 200;
        //        response.StatusMessage = "User Deleted Successful!";
        //    }
        //    else
        //    {
        //        response.StatusCode = 100;
        //        response.StatusMessage = "User Deletion Failed!";
        //    }
        //    return response;
        //}

        //[HttpPost]
        //[Route("EditUser")]
        //public Response EditUser(EditUser editUser)
        //{
        //    Response response = new Response();
        //    bool ret = dataAccess.EditUser(editUser);

        //    if (ret)
        //    {
        //        response.StatusCode = 200;
        //        response.StatusMessage = "User Edited Successfully!";
        //    }
        //    else
        //    {
        //        response.StatusCode = 100;
        //        response.StatusMessage = "User Editing Failed!";
        //    }
        //    return response;
        //}
    }
}
