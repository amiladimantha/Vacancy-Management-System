using Microsoft.AspNetCore.Mvc;
using System.Data;
using VMS.Library;

namespace VMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        public UserController(IConfiguration configuration) : base(configuration)
        {
        }

        [HttpPost]
        [Route("Login")]
        public Response Login(Login login)
        {
            Response response = new Response();
            DataRow[] rows = dataAccess.Login(login);
            if (rows != null && rows.Length > 0)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Login Successful!";
                Registration reg = new Registration();
                reg.ID = Convert.ToInt32(rows[0]["ID"]);
                reg.Name = Convert.ToString(rows[0]["Name"]);
                reg.Email = Convert.ToString(rows[0]["Email"]);
                reg.Phone = Convert.ToString(rows[0]["Phone"]);
                reg.AccountType = Convert.ToInt32(rows[0]["AccountType"]);
                reg.IsActive = Convert.ToInt32(rows[0]["IsActive"]);
                reg.IsApproved = Convert.ToInt32(rows[0]["IsApproved"]);
                if (rows[0]["Image"] != null && !string.IsNullOrEmpty(rows[0]["Image"].ToString()))
                {
                    if (rows[0]["Image"] is byte[])
                    {
                        reg.Image = (byte[])rows[0]["Image"];
                    }
                    else if (rows[0]["Image"] is string)
                    {
                        reg.Image = Convert.FromBase64String(rows[0]["Image"].ToString());
                    }
                    else
                    {
                        reg.Image = null;
                    }
                }
                else
                {
                    reg.Image = null;
                }

                response.Registration = reg;
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Login Failed!";
                response.Registration = null;
            }



            return response;
        }

        [HttpPost]
        [Route("Registration")]
        public Response Registration(Registration registration)
        {
            Response response = new Response();
            bool ret = dataAccess.Registration(registration);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Registration Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Registration Failed!";
            }
            return response;
        }

        [HttpGet]
        [Route("RegistrationList")]
        public Response RegistrationList()
        {

            Response response = new Response();
            DataTable dt = dataAccess.RegistrationList();

            List<RegistrationList> lstRegistration = new List<RegistrationList>();
            if (dt != null && dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    RegistrationList reg = new RegistrationList();
                    reg.ID = Convert.ToInt32(dt.Rows[i]["ID"]);
                    reg.Name = Convert.ToString(dt.Rows[i]["Name"]);
                    reg.Email = Convert.ToString(dt.Rows[i]["Email"]);
                    reg.Password = Convert.ToString(dt.Rows[i]["Password"]);
                    reg.Phone = Convert.ToString(dt.Rows[i]["Phone"]);
                    reg.IsActive = Convert.ToInt32(dt.Rows[i]["IsActive"]);
                    reg.IsApproved = Convert.ToInt32(dt.Rows[i]["IsApproved"]);
                    reg.AccountType = Convert.ToInt32(dt.Rows[i]["AccountType"]);
                    lstRegistration.Add(reg);

                }

                response.StatusCode = 200;
                response.StatusMessage = "Records Retrieved Successful!";
                response.listRegistration = lstRegistration;

            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "No records!";
                response.listRegistration = null;

            }
            return response;

        }

        [HttpPost]
        [Route("ActivateUser")]
        public Response ActivateUser(ActivateUser activateUser)
        {
            Response response = new Response();
            bool ret = dataAccess.ActivateUser(activateUser);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Activated Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Activation Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("AddUser")]
        public Response AddUser(AddUser addUser)
        {
            Response response = new Response();
            bool ret = dataAccess.AddUser(addUser);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Added Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Addition Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("ApproveUser")]
        public Response ApproveUser(ApproveUser approveUser)
        {
            Response response = new Response();
            bool ret = dataAccess.ApproveUser(approveUser);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Approved Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Approval Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("BlockUser")]
        public Response BlockUser(BlockUser blockUser)
        {
            Response response = new Response();
            bool ret = dataAccess.BlockUser(blockUser);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Blocked Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Blocking Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("DeleteUser")]
        public Response DeleteUser(DeleteUser deleteUser)
        {
            Response response = new Response();
            bool ret = dataAccess.DeleteUser(deleteUser);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Deleted Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Deletion Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("EditUser")]
        public Response EditUser(EditUser editUser)
        {
            Response response = new Response();
            bool ret = dataAccess.EditUser(editUser);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "User Edited Successfully!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "User Editing Failed!";
            }
            return response;
        }
    }
}
