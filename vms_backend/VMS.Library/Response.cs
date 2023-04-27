namespace VMS.Library
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string StatusMessage { get; set; }
        public Registration Registration { get; set; }
        public List<RegistrationList> listRegistration { get; set; }
        public List<JobList> listJob { get; set; }
        public List<ApplicantList> listApplicant { get; set; }
        public List<ApprovedApplicantList> listApprovedApplicant { get; set; }
        public List<HiredApplicantList> listHiredApplicant { get; set; }
    }
}
