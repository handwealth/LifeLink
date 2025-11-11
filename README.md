# 🌱 LifeLink – Organ & Blood Donation Platform

LifeLink is a full-stack MERN application that connects organ & blood donors with recipients in need.  
Users can register as donors, manage their donation availability, and recipients can search for matching donors based on filters like **organ type, blood group, and location**.

Admins have access to a dashboard to manage donors and maintain platform integrity.

---

## 🚀 Features

### 👤 User Features
- Register/Login using JWT authentication
- Update personal donor profile (organ, blood group, phone, location)
- Toggle donation **availability**
- Search donors based on:
  - Organ type
  - Blood group
  - Location (optional feature you can extend)

### 🛠 Admin Features
- View all donors in a dashboard
- Search & filter donors
- Edit donor details
- Delete donors from the database
- Access restricted to users with role = `admin`

---

## 🏗 Tech Stack

| Category        | Technologies Used |
|-----------------|------------------|
| **Frontend**    | React + Vite, Tailwind CSS |
| **Backend**     | Node.js, Express.js |
| **Database**    | MongoDB (Mongoose ORM) |
| **Auth**        | JWT Authentication |
| **Tools**       | Axios, Postman, Git |

---

## 📂 Project Structure

LifeLink
│── backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── server.js
│
└── frontend
├── src/
├── components/
├── pages/
└── main.jsx


---

## 🔧 Installation & Setup

### 1. Clone the repository
```sh
git clone https://github.com/<your-username>/lifelink.git

### 2. Backend Setup

cd backend
npm install


### Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


### Run backend:

npm start


### 3. Frontend Setup

cd ../frontend
npm install
npm run dev


## 🔐 Environment Variables (.env)
Variable Name	            Description
MONGO_URI	                MongoDB connection string
JWT_SECRET	                Secret key used to sign JWT
PORT	                    Backend running port

## ✅ Admin Access
Currently handled manually via database.

In MongoDB Atlas, update user document:

{
  "role": "admin"
}
Only admin accounts can access /admin/dashboard.

## 📌 API Endpoints
Method	    Endpoint	              Description
POST	    /api/auth/register	      Register new user
POST	    /api/auth/login	          User login
PUT	        /api/donor/update	      Update donor profile
GET	        /api/donors/search	      Search donors
GET	        /api/admin/donors	      Admin – get all donors
DELETE	    /api/admin/donor/:id	  Admin – delete donor

---
```
## 🧠 Future Enhancements

- OTP verification before sharing donor contact details

- Real-time location-based donor matching

- Email/SMS notifications to donors

- AI-assisted donor matching recommendations


## ❤️ Contributing

Contributions are always welcome!

1. Fork the repository

2. Create a new branch (feature/someFeature)

3. Commit & push

4. Create a pull request

## 📝 License

This project is licensed under the MIT License.

## ✨ Developed as a project by: Vanshika Singh

### Saving lives through technology 💚


---

### ✅ Final Step

Add the file:

```sh
touch README.md
