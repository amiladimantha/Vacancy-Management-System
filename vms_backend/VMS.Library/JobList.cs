using System.Reflection.PortableExecutable;

namespace VMS.Library
{
    public class JobList
    {
        public int ID { get; set; }
        public int Creator_ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
    }
}
