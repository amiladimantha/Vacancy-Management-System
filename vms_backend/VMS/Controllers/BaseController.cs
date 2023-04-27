using Microsoft.AspNetCore.Mvc;
using VMS.Data;

namespace VMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController
    {
        protected VMS.Data.Data dataAccess;
        private readonly IConfiguration _configuration;
        public BaseController(IConfiguration configuration)
        {
            _configuration = configuration;


            if (dataAccess == null)
                dataAccess = new SQLData(connectionString: configuration.GetConnectionString("database"));


        }
    }
}
