![image](https://github.com/amiladimantha/Leave-Managment-System/assets/84844150/c328a3d4-387a-446c-bb19-b82bf13cd4ec)
# Introduction 

Leave management system : Has the user roles Admin , Manager, Employees

Admin 
1. View all Users details
2. View all Leave and Extra Leave requests
3. Create/Update/Delete Users 
4. Create/Update/Delete Leaves taken by any user role
5. Create/Update/Delete Extra Leaves taken by any user role
6. Approve/Reject Leave and Extra Leave requests
7. Create Leave and Extra Leave requests
8. View Leaves and Extra Leaves requested by own account
9. View/Update personal data

Manager 
1. View all Employee details
2. View all Leave and Extra Leave requests
3. Create Leave and Extra Leave requests
4. Approve/Reject Leave and Extra Leave requests
5. View Leaves and Extra Leaves requested by own account
6. View/Update personal data

Employee 
1. Create Leave and Extra Leave requests
2. View Leaves and Extra Leaves requested by own account
3. View/Update personal data

## License and Attribution

This project was something I did for an internship, so other than using the Logo image of the company and its name you can tweak the theme and components to use everything else.

## Built With

- React.js
- ASP.NET C#
- SQL/XML/OLEDB

## Pre Recorded Demo

- Click [here](https://hotel-landin-page-rosy.vercel.app/) to view the live demo.

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
- [Download the ZIP file from this location](https://github.com/amiladimantha/Leave-Managment-System/archive/refs/heads/master.zip) or run the following [git](https://git-scm.com/) command to clone the files to your machine:

```
git clone https://github.com/amiladimantha/Leave-Managment-System.git
```
### Frontend

- Once the files are on your machine, open the **leave-management-system** folder
- Next open the **frontend-tst** folder in [Visual Studio Code](https://code.visualstudio.com/download).

```
cd leave-management-system
cd frontend-tst && code .
```

### Backend

- Once the files are on your machine, open the **leave-management-system** folder
- Next open the **usermg-backend** folder and run the **LMS.sln** using [Visual Studio](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&channel=Release&version=VS2022&source=VSLandingPage&cid=2030&passive=false).
- This will start the backend server

### Database

You can configure the database string using appsettings.json file in **usermg-backend** >> **LMS** >> **appsettings.json** => modify this : "Server=[your device sql server name];Database=usermg;Trusted_Connection=True;" replace the server name of your devices sql server.
The database name given by me in connection string is "usermg"


The SQL commands to create the database tables.

# ******************************
create database usermg;

use usermg;

create table Registration(
ID int identity(1,1) primary key,
Name varchar(100),
Email varchar(100),
Password varchar(100),
Phone varchar(100),
IsActive int,
IsApproved int,
AccountType int,
Birthday Datetime,
Address varchar(500),
Image varchar(100)
);

create table Leaves(
ID int identity(1,1) primary key,
CreatorID int,
CreatorName varchar(100),
FromDate Datetime,
ToDate Datetime,
NoofDays int,
LeaveType int,
IsApproved int,
FOREIGN KEY (CreatorID) REFERENCES Registration(ID)
);


create table ExtraLeaves(
ID int identity(1,1) primary key,
CreatorID int,
CreatorName varchar(100),
FromDate Datetime,
ToDate Datetime,
NoofDays int,
Reason varchar(1000),
IsApproved int,
FOREIGN KEY (CreatorID) REFERENCES Registration(ID)
);

# ******************************
create an admin account from here, 

insert into registration (name,email,password,phone,isactive,isapproved,accounttype,birthday,address) 
values ('admin','admin@gmail.com','nyKq4FXckfUq3AyecAFYqw==', '7975777666', 1,1,0,'1989-01-09 13:30:28.620','London, UK') 

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

Your feedback, suggestions, and contributions are greatly appreciated in this project. Whether you want to provide input, propose improvements, or submit your ideas and enhancements, your involvement is highly valued. Keep in mind that this is just the beginning, and the real beauty lies in personalizing it to reflect your individual talents and achievements. Enjoy the process of crafting an impressive portfolio that truly represents you!

Wishing you a fulfilling experience as you code and showcase your work!

## Show your support

Give a ⭐️ if you like this project!

the database name is "usermg"
in the appsettings.json "Server=[your device sql server name];Database=usermg;Trusted_Connection=True;" replace the server name of your devices sql server.

The SQL commands to create the database tables.

# ******************************
create database usermg;

use usermg;

create table Registration(
ID int identity(1,1) primary key,
Name varchar(100),
Email varchar(100),
Password varchar(100),
Phone varchar(100),
IsActive int,
IsApproved int,
AccountType int,
Birthday Datetime,
Address varchar(500),
Image varchar(100)
);

create table Leaves(
ID int identity(1,1) primary key,
CreatorID int,
CreatorName varchar(100),
FromDate Datetime,
ToDate Datetime,
NoofDays int,
LeaveType int,
IsApproved int,
FOREIGN KEY (CreatorID) REFERENCES Registration(ID)
);


create table ExtraLeaves(
ID int identity(1,1) primary key,
CreatorID int,
CreatorName varchar(100),
FromDate Datetime,
ToDate Datetime,
NoofDays int,
Reason varchar(1000),
IsApproved int,
FOREIGN KEY (CreatorID) REFERENCES Registration(ID)
);

# ******************************
create an admin account from here, 

insert into registration (name,email,password,phone,isactive,isapproved,accounttype,birthday,address) 
values ('admin','admin@gmail.com','nyKq4FXckfUq3AyecAFYqw==', '0773581169', 1,1,0,'1989-01-09 13:30:28.620','Kandy, SriLanka') 

or register an account from ui and set the accounttype as 0 using an sql query, this will make that account as the admin

#*******************************

Admin email : admin@gmail.com
Password : Admin123
