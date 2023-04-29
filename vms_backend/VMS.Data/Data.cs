using VMS.Library;
using System.Data;
using System.Security.AccessControl;

namespace VMS.Data
{
    public abstract class Data
    {
        private string connectionString = string.Empty;
        private string databaseName = string.Empty;

        public Data()
        {

        }
        public Data(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public string ConnectionString
        {
            get { return connectionString; }
            set { connectionString = value; }
        }
        public string DatabaseName
        {
            get { return databaseName; }
            set { databaseName = value; }
        }
        public virtual bool Registration(Registration registration)
        {
            return false;
        }
        
        public virtual DataRow[] Login(Login login)
        {
            return null;
        }

        public virtual DataTable RegistrationList()
        {
            return null;
        }
        
        public virtual bool ActivateUser(ActivateUser activateUser)
        {
            return false;
        }

        public virtual bool AddUser(AddUser addUser)
        {
            return false;
        }
        public virtual bool EditProfileImage(int id, byte[] image)
        {
            return false;
        }

        public virtual bool ApproveUser(ApproveUser approveUser)
        {
            return false;
        }
        public virtual bool BlockUser(BlockUser blockUser)
        {
            return false;
        }
        public virtual bool DeleteUser(DeleteUser deleteUser)
        {
            return false;
        }
        public virtual bool EditUser(EditUser editUser)
        {
            return false;
        }
        public virtual bool EditProfile(EditProfile editProfile)
        {
            return false;
        }
        public virtual bool EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            return false;
        }
        public virtual bool EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            return false;
        }
        public virtual bool EditJob(EditJob editJob)
        {
            return false;
        }
        public virtual bool AddJob(int creator_Id, string title, string description, string responsibilities, string requirements, byte[] image)
        {
            return false;
        }
        public virtual bool JobApplication( int job_Id, string name, string email, string phone, string national_Id, byte[] cv)
        {
            return false;
        }
        public virtual bool ApproveApplicant(ApproveApplicant approveApplicant)
        {
            return false;
        }
        public virtual bool RejectApplicant(RejectApplicant rejectApplicant)
        {
            return false;
        }
        public virtual bool RejectHire(RejectHire rejectHire)
        {
            return false;
        }
        public virtual bool HireApplicant(HireApplicant hireApplicant)
        {
            return false;
        }
        public virtual bool EditMeeting(EditMeeting editMeeting)
        {
            return false;
        }
        public virtual DataTable JobList()
        {
            return null;
        }
        public virtual DataTable ApplicantList()
        {
            return null;
        }
        public virtual DataTable ApprovedApplicantList()
        {
            return null;
        }
        public virtual DataTable HiredApplicantList()
        {
            return null;
        }
        public virtual bool DeleteJob(DeleteJob deleteJob)
        {
            return false;
        }
    }
}