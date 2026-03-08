# 🩸 RaktSetu: Blood & Plasma Donation Portal

RaktSetu is a full-stack web application built to connect voluntary blood and COVID-19 plasma donors with patients across India. It provides a real-time live board for urgent requirements and a searchable directory of registered donors.

**Live Demo:** [https://leafy-crepe-34f486.netlify.app/](https://leafy-crepe-34f486.netlify.app/)  
**Backend API:** Hosted on Render

> **⚠️ Note on Live Demo Performance:** The backend Node.js server for this project is hosted on Render's free tier. If the server has been inactive for 15 minutes, it automatically spins down to save resources. 
> 
> Because of this, **your very first search or form submission might take 50–60 seconds to process** while the server "wakes up." Once it is awake, all subsequent requests will be instant!

## ✨ Key Features
* **Donor Directory:** Users can register as blood or plasma donors, categorized by blood group and location.
* **Live Requirements Board:** Patients can post urgent blood/plasma requests that instantly appear on a live public feed.
* **Advanced Search & Filtering:** Filter live database records by state, city, and blood type.
* **Responsive Design:** Fully functional across desktop and mobile devices.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
* **Backend:** Node.js, Express.js
* **Database:** MySQL (Hosted on Aiven Cloud)
* **Deployment:** Netlify (Frontend) & Render (Backend)

## 🚀 How to Run Locally

If you want to download and run this project on your own computer, follow these steps:

### 1. Database Setup
You will need a MySQL database. Create a table for `donors` and a table for `requirements`. 

### 2. Backend Setup
1. Open your terminal and navigate to the backend folder.
2. Run `npm install` to install the required dependencies (Express, CORS, MySQL2, Dotenv).
3. Create a `.env` file in the root of the backend folder and add your database connection string:
   ```text
   DATABASE_URL="your_mysql_database_url_here"
