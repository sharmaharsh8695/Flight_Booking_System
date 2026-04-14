# ✈️ Flight Booking Microservices System

A backend system designed using **microservices architecture** to handle flight booking, seat inventory, authentication, and notifications.

This project focuses on solving real-world backend challenges such as **concurrent booking, data consistency, and service communication**.

---

## 🏗️ Architecture

The system is divided into independent services:

- **API Gateway** →  Handles authentication , authorization (JWT-based) And routes requests to services  
- **Booking Service** → Manages reservations with transaction handling  
- **Flight Service** → Manages flight data and seat inventory  

---

## ⚙️ Key Features

- Prevents **double-booking** using transaction management  
- Handles **concurrent requests** safely  
- Modular **microservices architecture**  
- RESTful API communication between services  
- Scalable and maintainable backend design  

---

## 🧠 Core Backend Concepts Used

- Transactions & Concurrency Control  
- ACID Properties  
- REST API Design  
- Microservices Architecture  
- Database Indexing & Schema Design  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Architecture:** Microservices  
- **Communication:** REST APIs  

---

## 📁 Project Structure
flight-booking-system/
│
├── API-gateway/
├── booking-service/
├── flight-service/
│
└── README.md

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sharmaharsh8695/Flight_Booking_System
cd flight-booking-system


### Install dependencies
cd <service-folder>
npm install

### Setup environment variables
create .env file
