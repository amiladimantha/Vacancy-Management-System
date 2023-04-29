using System.Reflection.PortableExecutable;

namespace VMS.Library
{
    public class EditJob
    {
        public int ID { get; set; }
        public int Creator_ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Responsibilities { get; set; }
        public string Requirements { get; set; }
        public byte[] Image { get; set; }
    }
}
