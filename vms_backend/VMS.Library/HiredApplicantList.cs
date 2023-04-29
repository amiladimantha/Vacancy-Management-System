using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VMS.Library
{
    public class HiredApplicantList
    {
        public int ID { get; set; }
        public int? Approvers_ID { get; set; }
        public int Job_ID { get; set; }
        public string Title { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string National_ID { get; set; }
        public int? Hired { get; set; }
        public int? IsApproved { get; set; }
        public string? Meeting_Date { get; set; }
        public string? Meeting_Time { get; set; }
        public byte[] CV { get; set; }
    }
}
