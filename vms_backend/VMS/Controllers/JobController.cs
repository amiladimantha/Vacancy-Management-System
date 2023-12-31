﻿using Microsoft.AspNetCore.Mvc;
using System.Data;
using VMS.Library;

namespace VMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : BaseController
    {
        public JobController(IConfiguration configuration) : base(configuration)
        {
        }

        //[HttpPost]
        //[Route("AddJob")]
        //public Response AddJob(AddJob addJob)
        //{
        //    Response response = new Response();
        //    bool ret = dataAccess.AddJob(addJob);

        //    if (ret)
        //    {
        //        response.StatusCode = 200;
        //        response.StatusMessage = "Job Created Successfully!";
        //    }
        //    else
        //    {
        //        response.StatusCode = 100;
        //        response.StatusMessage = "Job Creation Failed!";
        //    }
        //    return response;
        //}

        [HttpGet]
        [Route("JobList")]
        public Response JobList()
        {

            Response response = new Response();
            DataTable dt = dataAccess.JobList();

            List<JobList> lstJob = new List<JobList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    JobList jl = new JobList();
                    jl.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    jl.Creator_ID = Convert.ToInt32(dt.Rows[i]["Creator_ID"]);
                    jl.Title = Convert.ToString(dt.Rows[i]["Title"]);
                    jl.Description = Convert.ToString(dt.Rows[i]["Description"]);
                    jl.Responsibilities = Convert.ToString(dt.Rows[i]["Responsibilities"]);
                    jl.Requirements = Convert.ToString(dt.Rows[i]["Requirements"]);
                    jl.Closing_Date = Convert.ToString(dt.Rows[i]["Closing_Date"]);
                    if (dt.Rows[i]["Image"] != null && !string.IsNullOrEmpty(dt.Rows[i]["Image"].ToString()))
                    {
                        if (dt.Rows[i]["Image"] is byte[])
                        {
                            jl.Image = (byte[])dt.Rows[i]["Image"];
                        }
                        else if (dt.Rows[i]["Image"] is string)
                        {
                            jl.Image = Convert.FromBase64String(dt.Rows[i]["Image"].ToString());
                        }
                        else
                        {
                            jl.Image = null;
                        }
                    }
                    else
                    {
                        jl.Image = null;
                    }
                    lstJob.Add(jl);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listJob = lstJob;

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listJob = null;

            }
            return response;

        }

        [HttpPost]
        [Route("EditJob")]
        public Response EditJob([FromForm] int id, [FromForm] int creator_Id, [FromForm] string title, [FromForm] string description, [FromForm] string responsibilities, [FromForm] string requirements, [FromForm] string closing_Date, IFormFile image)
        {
            Response response = new Response();

            try
            {

                if (image == null || image.Length == 0)
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Please select an image.";
                    return response;
                }

                // Convert image to byte array
                byte[] imageBytes;
                using (var memoryStream = new MemoryStream())
                {
                    image.CopyTo(memoryStream);
                    imageBytes = memoryStream.ToArray();
                }

                // Save image bytes to database along with title and description
                bool ret = dataAccess.EditJob(id, creator_Id, title, description, responsibilities, requirements, closing_Date, imageBytes);

                if (ret)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Job edited successfully!";
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Job editing failed!";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.StatusMessage = "An error occurred while editing job vacancy.";
            }

            return response;
        }

        [HttpPost]
        [Route("DeleteJob")]
        public Response DeleteJob(DeleteJob deleteJob)
        {
            Response response = new Response();
            bool ret = dataAccess.DeleteJob(deleteJob);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Job Deleted Successfully!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Job Deleting Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("AddJob")]
        public Response AddJob([FromForm] int creator_Id, [FromForm] string title, [FromForm] string description, [FromForm] string responsibilities, [FromForm] string requirements, [FromForm] string closing_Date, IFormFile image)
        {
            Response response = new Response();

            try
            {

                if (image == null || image.Length == 0)
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Please select an image.";
                    return response;
                }

                // Convert image to byte array
                byte[] imageBytes;
                using (var memoryStream = new MemoryStream())
                {
                    image.CopyTo(memoryStream);
                    imageBytes = memoryStream.ToArray();
                }

                // Save image bytes to database along with title and description
                bool ret = dataAccess.AddJob(creator_Id, title, description, responsibilities, requirements, closing_Date, imageBytes);

                if (ret)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Job added successfully!";
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Job Adding failed!";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.StatusMessage = "An error occurred while adding job vacancy.";
            }

            return response;
        }

    }

}
