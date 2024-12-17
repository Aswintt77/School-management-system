School Management System

A complete School Management System (SMS) designed to manage students, staff, librarians, fees, and library records efficiently. This web application offers role-based access for Admin, Staff, and Librarian with features like viewing, adding, updating, and deleting records, as well as keeping track of various metrics (staff, students, librarians).

Features

Admin Dashboard:
  - View counts of staff, students, and librarians.
  - Manage student, staff, librarian, fee, and library records.

Role-based Access:
  - Admin: Full access to all records and dashboards.
  - Staff: Can view and manage their own records.
  - Librarian: Can manage and view library records.

Database:
  - Stores student data, staff records, librarian details, fee history, and library transaction records.

Real-time Updates:
  - The system uses APIs to fetch real-time data for staff, student, librarian counts, and other metrics.

Tech Stack

Frontend:
  - React.js
  - CoreUI React for UI components
  - Axios for API calls
  - React Router for routing
  - React Hot Toast for notifications

Backend:
  - Node.js with Express.js
  - MongoDB for data storage (via Mongoose)
  - RESTful API for CRUD operations

Authentication:
  - JWT-based authentication with token storage in local storage.
  - Role-based access control to restrict access for different users.

Installation & Setup

Prerequisites
1. Node.js: Ensure you have Node.js installed on your machine.
2. MongoDB: A MongoDB database is required for storing data. You can use a local MongoDB instance or MongoDB Atlas.

Backend Setup

1. Clone the repository:
   git clone <repo-url>
   cd <repo-folder>

2. Install dependencies:
   npm install

3. Create a .env file in the root of the backend directory with the following variables:
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000

4. Start the server:
   node server.js

   The backend should now be running on http://localhost:5000.

Frontend Setup

1. Navigate to the frontend directory:
   cd <frontend-folder>

2. Install dependencies:
   npm install

3. Run the frontend:
   npm start

   The frontend should now be running on http://localhost:3000.

Database Setup
- Create collections for students, staff, librarians, fees, and library in your MongoDB instance.
- Insert sample data or use the Admin panel to add data.

Folder Structure

/school-management-backend
  /models              # Mongoose models for data
  /routes              # API routes (students, staff, fees, etc.)
  /controllers         # Logic for each route
  /middleware          # Authentication and other middlewares
  /config              # Database configuration, environment setup
  server.js            # Main backend server file

/school-management-frontend
  /src
    /components        # React components (tables, modals, etc.)
    /pages             # Pages for Admin, Staff, Librarian dashboards
    /services          # API calls to the backend
    /assets            # Images, fonts, and other assets
  App.js               # Main React component
  index.js             # Entry point for React

Usage

1. Admin:
   - Login to the dashboard.
   - View metrics such as the count of staff, students, and librarians.
   - Manage all records including adding, editing, and deleting students, staff, librarians, fees, and library transactions.

2. Staff:
   - Login as a staff member.
   - View and update their personal details and records.

3. Librarian:
   - Login as a librarian.
   - Manage library records, including adding, editing, and viewing books borrowed by students.

Contributing

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name.
3. Commit your changes: git commit -am 'Add new feature'.
4. Push to the branch: git push origin feature-name.
5. Create a new Pull Request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
