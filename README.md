\# Job Application Tracker



A full-stack web application for tracking and managing job applications.



\## Features



\- Add job applications

\- View all applications

\- Edit applications

\- Delete applications

\- Search by company or job title

\- Filter applications by status

\- Dashboard with application statistics

\- Persistent data storage using MongoDB Atlas

\- Responsive user interface



\## Technologies Used



\### Frontend



\- HTML5

\- CSS3

\- JavaScript



\### Backend



\- Node.js

\- Express.js

\- REST API



\### Database



\- MongoDB Atlas

\- Mongoose



\### Tools



\- Git

\- GitHub

\- VS Code



\## Application Architecture



Browser  

↓  

HTML / CSS / JavaScript  

↓  

Express REST API  

↓  

Mongoose  

↓  

MongoDB Atlas



\## CRUD Operations



The application supports:



\- \*\*Create\*\* — Add a new job application

\- \*\*Read\*\* — Load applications from MongoDB

\- \*\*Update\*\* — Edit an existing application

\- \*\*Delete\*\* — Remove an application from MongoDB



\## How to Run



\### 1. Install dependencies



```bash

npm install
2. Configure environment variables

Create a .env file:

MONGODB_URI=your_mongodb_connection_string
3. Start the server
node server.js

The server runs on:

http://localhost:3000
4. Open the application

Open index.html in your browser.

Project Structure
job-application-tracker/
│
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
Future Improvements
User authentication
Better edit form
Pagination
Sorting
Application notes
Interview tracking
Application deadlines
Cloud deployment

Author
Rzn
