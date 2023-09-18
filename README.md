![image](https://github.com/amiladimantha/Vacancy-Management-System/assets/84844150/efd72771-d589-4a16-9361-a87bcbde32f4)
![image](https://github.com/amiladimantha/Vacancy-Management-System/assets/84844150/fbde6d4d-84da-4e3f-8f79-8ced896eb5bd)
![image](https://github.com/amiladimantha/Vacancy-Management-System/assets/84844150/bec21a9c-fbf9-4ebb-a0d8-2115d1348877)
![image](https://github.com/amiladimantha/Vacancy-Management-System/assets/84844150/9afa6246-f4f8-4433-81c8-8ed4c8124c71)


# Introduction 

Vacancy management system : Has the user roles Admin , Manager

Admin 
1. View all Users details
2. View all Jobs posts
3. View all applicant details
4. Create/Update/Delete Users 
5. Create/Update/Delete Job Posts
6. Update status to Approved/Rejected for applicants
7. Update status to Hired/Rejected for applicants
8. View/Update personal data

Manager 
1. View all Jobs posts
2. View all applicant details
3. Create/Update/Delete Job Posts
4. Update status to Approved/Rejected for applicants
5. Update status to Hired/Rejected for applicants
6. View/Update personal data


## License and Attribution

This project was something I did for an internship, so other than using the Logo image of the company and its name you can tweak the theme and components to use everything else.

## Built With

- React.js
- ASP.NET C#
- SQL


## Getting Started

To get started with this, follow these simple steps:

### Prerequisites

Node.js 
Visual studio
Visual studio code
Git
Microsoft SQL server management studio or SQL database connection string

### Setup

- With git, clone the code to your machine, or download a ZIP of all the files directly.
- [Download the ZIP file from this location](https://github.com/amiladimantha/Vacancy-Management-System/archive/refs/heads/master.zip) or run the following [git](https://git-scm.com/) command to clone the files to your machine:

```
git clone https://github.com/amiladimantha/Vacancy-Management-System.git
```
### Frontend

- Once the files are on your machine, open the **vacancy-management-system** folder
- Next open the **frontend-tst** folder in [Visual Studio Code](https://code.visualstudio.com/download).

```
cd Vacancy-Management-System
cd frontend-tst && code .
```

### Backend

- Once the files are on your machine, open the **vacancy-management-system** folder
- Next open the **vms-backend** folder, open the **VMS** folder in it you will find the **VMS.sln** run it using [Visual Studio](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Release&version=VS2022&source=VSLandingPage&cid=2030&passive=false).
- This will start the backend server

### Database

You can configure the database string using appsettings.json file in **vms_backend** >> **VMS** >> **appsettings.json** => modify this : "Server=[your device sql server name];Database=vmsdb;Trusted_Connection=True;" replace the server name of your devices sql server.
The database name given by me in connection string is "vmsdb"


The SQL commands to create the database tables are below.

# ******************************
create database vmsdb;

use vmsdb;

create table Applicant(
ID int identity(1,1) primary key,
Approvers_ID int,
Name varchar(100),
Email varchar(100),
Phone varchar(100),
National_ID varchar(100),
Hired int,
IsApproved int,
Meeting_Date VARCHAR(100),
Meeting_Time varchar(100),
Job_ID int,
CV varbinary(max)
Foreign key (Approvers_ID) references Users(ID),
Foreign key (Job_ID) references Job_Vacancy(ID)
);

create table Users(
ID int identity(1,1) primary key,
Name varchar(100),
Email varchar(100),
Password varchar(100),
Phone varchar(100),
IsActive int,
IsApproved int,
AccountType int,
Image varbinary(max)
);

create table Job_Vacancy(
ID int identity(1,1) primary key,
Creator_ID int,
Title varchar(100),
Description varchar(max),
Closing_Date VARCHAR(100),
Image varbinary(max)
Foreign key (Creator_ID) references Users(ID)
);


# ******************************
create an admin account by using the below query,

insert into Users (name,email,password,phone,isactive,isapproved,accounttype) 
values ('admin','admin@gmail.com','nyKq4FXckfUq3AyecAFYqw==', '9773581169', 1,1,0)

Admin email : admin@gmail.com
Password : Admin123   after encryption => nyKq4FXckfUq3AyecAFYqw==

or register an account from ui and set the accounttype as 0 using an sql query, this will make that account as the admin

#*******************************


 
## Install

- After opening the files in Visual Studio Code, open the **VS Code** integrated terminal and run the following commands:

```
npm install
```

This will install all the packages and dependencies used in the project.

## Usage

- Run the following command to start a local server:

```
npm start
```

This will open up the project on a browser on ` http://localhost:3000`

## Build

- To create a production build:

```
npm run build
```

- To preview the site as it will appear once deployed:

```
npm run preview
```

## Authors

👤 **Amila Dimantha**

- GitHub: [@amiladimantha](https://github.com/amiladimantha)
- LinkedIn: [Amila Dimantha](https://www.linkedin.com/in/amila-dimantha-37182a21b)

## Feedback and Contributions

Your feedback, suggestions, and contributions are greatly appreciated in this project. Whether you want to provide input, propose improvements, or submit your ideas and enhancements, your involvement is highly valued. Keep in mind that this is just the beginning, and the real beauty lies in personalizing it to reflect your individual talents and achievements. Enjoy the process of crafting impressive projects that truly represents your skills!

Wishing you a fulfilling experience as you code and showcase your work!

## Show your support

Give a ⭐️ if you like this project!
