using VMS.Library;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Drawing.Imaging;

namespace VMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : BaseController
    {
        private readonly IWebHostEnvironment _env;

        public ProfileController(IConfiguration configuration, IWebHostEnvironment env) : base(configuration)
        {
            _env = env;
        }


        [HttpPost]
        [Route("EditProfile")]
        public Response EditProfile(EditProfile editProfile)
        {
            Response response = new Response();
            bool ret = dataAccess.EditProfile(editProfile);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Profile Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Profile Editing Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("EditProfileEmail")]
        public Response EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            Response response = new Response();
            bool ret = dataAccess.EditProfileEmail(editProfileEmail);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Email Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Email Editing Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("EditProfilePassword")]
        public Response EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            Response response = new Response();
            bool ret = dataAccess.EditProfilePassword(editProfilePassword);

            if (ret)
            {
                response.StatusCode = 200;
                response.StatusMessage = "Password Edited Successful!";
            }
            else
            {
                response.StatusCode = 100;
                response.StatusMessage = "Password Editing Failed!";
            }
            return response;
        }

        [HttpPost]
        [Route("EditProfileImage")]
        public Response EditProfileImage([FromForm]int id, IFormFile image)
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

                // Save image bytes to database
                bool ret = dataAccess.EditProfileImage(id, imageBytes);

                if (ret)
                {
                    response.StatusCode = 200;
                    response.StatusMessage = "Profile image edited successfully!";
                }
                else
                {
                    response.StatusCode = 100;
                    response.StatusMessage = "Profile image editing failed!";
                }
            }
            catch (Exception ex)
            {
                response.StatusCode = 500;
                response.StatusMessage = "An error occurred while editing the profile image.";
            }

            return response;
        }







    }
}
