using System.Reflection.PortableExecutable;

namespace VMS.Library
{
    public class AddUser
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int IsActive { get; set; }
        public int IsApproved { get; set; }
        public int AccountType { get; set; }
    }
}
