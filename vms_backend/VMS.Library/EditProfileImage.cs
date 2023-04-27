using Microsoft.AspNetCore.Http;

namespace VMS.Library
{
    public class EditProfileImage
    {
        public int ID { get; set; }
        //public string Image { get; set; }

        public byte[] Image { get; set; }

    }
}
