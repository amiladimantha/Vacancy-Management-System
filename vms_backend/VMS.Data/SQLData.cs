using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using VMS.Library;

namespace VMS.Data
{
    public class SQLData : Data
    {
        SqlConnection connection;
        public SQLData()
        {

        }
        public SQLData(string connectionString)
        {
            base.ConnectionString = connectionString;
            if (connection == null)
            {
                connection = new SqlConnection(connectionString);
            }

        }

        public override DataRow[] Login(Login login)
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Users WHERE Email = '" + login.Email + "' AND Password = '" + login.Password + "'", connection);
            da.Fill(dt);
            return dt.Select();
        }

        public override bool Registration(Registration registration)
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO Users(Name,Email,Password,Phone,IsActive,IsApproved,AccountType) VALUES ('" + registration.Name + "','" + registration.Email + "','" + registration.Password + "','" + registration.Phone + "',1,0, '" + registration.AccountType + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override DataTable RegistrationList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Users where AccountType != 0", connection);
            da.Fill(dt);
            return dt;
        }
        public override bool EditProfile(EditProfile editProfile)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET Name = '" + editProfile.Name + "', Phone = '" + editProfile.Phone + "' WHERE ID = '" + editProfile.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditProfileEmail(EditProfileEmail editProfileEmail)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET Email = '" + editProfileEmail.Email + "' WHERE ID = '" + editProfileEmail.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditProfilePassword(EditProfilePassword editProfilePassword)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET Password = '" + editProfilePassword.Password + "' WHERE ID = '" + editProfilePassword.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }

        public override bool ActivateUser(ActivateUser activateUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET IsActive = 1 WHERE ID = '" + activateUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool AddUser(AddUser addUser)
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO Users(Name,Email,Password,Phone,IsActive,IsApproved,AccountType) VALUES ('" + addUser.Name + "','" + addUser.Email + "','" + addUser.Password + "','" + addUser.Phone + "',1,'" + addUser.IsApproved + "', '" + addUser.AccountType + "')", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }

        public override bool EditProfileImage(int id, byte[] image)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET Image = @Image WHERE ID = @ID AND IsActive = 1", connection);
            cmd.Parameters.AddWithValue("@Image", image);
            cmd.Parameters.AddWithValue("@ID", id);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }



        public override bool ApproveUser(ApproveUser approveUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET IsApproved = 1 WHERE ID = '" + approveUser.ID + "' AND IsActive = 1", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool BlockUser(BlockUser blockUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET IsActive = 0 WHERE ID = '" + blockUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool DeleteUser(DeleteUser deleteUser)
        {
            SqlCommand cmd = new SqlCommand("DELETE FROM Users WHERE ID = '" + deleteUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditUser(EditUser editUser)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Users SET Name = '" + editUser.Name + "', Phone = '" + editUser.Phone + "',Email = '" + editUser.Email + "',Password = '" + editUser.Password + "'  WHERE ID = '" + editUser.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool EditJob(EditJob editJob)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Job_Vacancy SET Title = @Title, Description = @Description, Responsibilities = @Responsibilities, Requirements = @Requirements WHERE ID = @ID", connection);
            cmd.Parameters.AddWithValue("@Title", editJob.Title);
            cmd.Parameters.AddWithValue("@Description", editJob.Description);
            cmd.Parameters.AddWithValue("@Responsibilities", editJob.Responsibilities);
            cmd.Parameters.AddWithValue("@Requirements", editJob.Requirements);
            cmd.Parameters.AddWithValue("@ID", editJob.ID);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }


        public override bool AddJob(int creator_Id, string title, string description, string responsibilities, string requirements, byte[] image)
        {
            SqlCommand cmd = new SqlCommand("Insert Into Job_Vacancy (Image, Title, Description, Responsibilities, Requirements, Creator_ID) Values (@Image, @Title, @Description, @Responsibilities, @Requirements, @Creator_ID)", connection);
            cmd.Parameters.AddWithValue("@Image", image);
            cmd.Parameters.AddWithValue("@Creator_ID", creator_Id);
            cmd.Parameters.AddWithValue("@Title", title);
            cmd.Parameters.AddWithValue("@Description", description);
            cmd.Parameters.AddWithValue("@Responsibilities", responsibilities);
            cmd.Parameters.AddWithValue("@Requirements", requirements);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        
        }

        public override bool JobApplication( int job_Id, string name, string email, string phone, string national_Id, byte[] cv)
        {
            SqlCommand cmd = new SqlCommand("Insert Into Applicant (Job_ID, Name, Email, Phone, National_ID, Hired, IsApproved,  CV) Values (@Job_ID, @Name, @Email, @Phone, @National_ID, @Hired, @IsApproved, @CV)", connection);
            cmd.Parameters.AddWithValue("@CV", cv);
            cmd.Parameters.AddWithValue("@National_ID", national_Id);
            cmd.Parameters.AddWithValue("@Phone", phone);
            cmd.Parameters.AddWithValue("@Email", email);
            cmd.Parameters.AddWithValue("@Name", name);
            cmd.Parameters.AddWithValue("@Job_ID", job_Id);
            cmd.Parameters.AddWithValue("@Hired", 2);
            cmd.Parameters.AddWithValue("@IsApproved", 2);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool ApproveApplicant(ApproveApplicant approveApplicant)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Applicant SET IsApproved = 1, Approvers_ID = '" + approveApplicant.Approvers_ID + "' WHERE ID = '" + approveApplicant.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }

        public override bool RejectApplicant(RejectApplicant rejectApplicant)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Applicant SET IsApproved = 0, Approvers_ID = '" + rejectApplicant.Approvers_ID + "' WHERE ID = '" + rejectApplicant.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }

        public override bool EditMeeting(EditMeeting editMeeting)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Applicant SET Meeting_Date = '" + editMeeting.Meeting_Date + "', Meeting_Time = '" + editMeeting.Meeting_Time + "'  WHERE ID = '" + editMeeting.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool RejectHire(RejectHire rejectHire)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Applicant SET Hired = 0 WHERE ID = '" + rejectHire.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override bool HireApplicant(HireApplicant hireApplicant)
        {
            SqlCommand cmd = new SqlCommand("UPDATE Applicant SET Hired = 1 WHERE ID = '" + hireApplicant.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
        public override DataTable JobList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Job_Vacancy", connection);
            da.Fill(dt);
            return dt;
        }
        public override DataTable ApplicantList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT A.*, J.Title FROM Applicant A JOIN Job_Vacancy J ON A.Job_ID = J.ID", connection);
            da.Fill(dt);
            return dt;
        }

        public override DataTable ApprovedApplicantList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT A.*, J.Title FROM Applicant A JOIN Job_Vacancy J ON A.Job_ID = J.ID WHERE A.IsApproved = 1", connection);
            da.Fill(dt);
            return dt;
        }
        public override DataTable HiredApplicantList()
        {
            DataTable dt = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter("SELECT A.*, J.Title FROM Applicant A JOIN Job_Vacancy J ON A.Job_ID = J.ID WHERE IsApproved = 1 AND Hired = 1", connection);
            da.Fill(dt);
            return dt;
        }
        public override bool DeleteJob(DeleteJob deleteJob)
        {
            SqlCommand cmd = new SqlCommand("DELETE FROM Job_Vacancy WHERE ID = '" + deleteJob.ID + "' ", connection);
            connection.Open();
            int i = cmd.ExecuteNonQuery();
            connection.Close();
            if (i > 0)
                return true;
            return false;
        }
    }

}
