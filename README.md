# **Vehicle Tracking App**

## **Project Overview**

The Vehicle Tracking App is a real-time tracking system that leverages the [Traccar API](https://www.traccar.org/) to monitor and manage vehicles. The app provides features such as live location tracking, speed monitoring, route history, geofence alerts, and trip summaries. Built using a modern tech stack, the app is designed to be responsive, scalable, and user-friendly.

---

## **Features**

- **Real-Time Tracking**: View the current location and speed of vehicles on a map.
- **Route History**: Access detailed historical movement data for vehicles.
- **Event Alerts**: Receive notifications for geofence exits, overspeeding, and other key events.
- **Trip Summaries**: Generate reports detailing distance traveled, average speed, and trip durations.
- **User Management**: Secure user authentication and role-based access.

---

## **Tech Stack**

- **Frontend**: React with Vite for fast, modern web development.
- **Backend**: Node.js with Express and Sequelize for RESTful API development.
- **Database**: PostgreSQL, managed via Supabase.
- **API**: Traccar API for vehicle tracking and event management.
- **Others**: Mapbox or Leaflet for interactive maps.

---

## **Installation Guide**

### **Prerequisites**

- **Node.js** (v22) and **Yarn** installed.
- Supabase account for database management.
- Postman for testing API calls (optional but recommended).

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/vehicle-tracking-app.git
cd vehicle-tracking-app
### **Step 2: Install Dependencies**

**Backend**

### **Step 2: Install Dependencies**

**Backend**
```bash
cd backend
yarn install
```

**Frontend**
```bash
cd ../frontend
yarn install
```

### **Step 3: Configure Environment Variables**

**Backend**  
Create a `.env` file in the backend directory:
```env
DB_USER=<Your Supabase username>
DB_PASSWORD=<Your Supabase password>
DB_NAME=<Your Supabase database name>
DB_HOST=<Your Supabase database host>
TRACCAR_API_URL=<Your Traccar instance URL>
TRACCAR_API_TOKEN=<Your Traccar API token>
```

**Frontend**  
Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000  # Backend server URL
MAPBOX_API_KEY=<Your Mapbox API key>
```

### **Step 4: Initialize Database**

Run Sequelize migrations to set up the database schema:
```bash
cd backend
yarn sequelize db:migrate
```

### **Step 5: Start the Development Servers**

**Backend**
```bash
cd backend
yarn start
```

**Frontend**
```bash
cd frontend
yarn dev
```

Access the app at http://localhost:3000.

---

## **Usage**

1. **Login**: Start by logging in with your Supabase credentials.
2. **Add Vehicles**: Use the Traccar interface or backend API to register tracking devices.
3. **Monitor Live Data**: View vehicle locations and speeds on the map.
4. **View Alerts**: Access notifications for geofence and overspeeding events.
5. **Generate Reports**: Use the trip summary feature to analyze historical data.

---

## **Project Structure**

```bash
VehicleTrackingApp/
├── backend/          # Node.js API server
│   ├── config/       # Database and Sequelize configurations
│   ├── controllers/  # API request handling logic
│   ├── models/       # Sequelize ORM models
│   ├── routes/       # Backend API endpoints
│   ├── services/     # Traccar API integration
│   └── .env          # Environment variables
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── services/    # API interaction logic
│   │   ├── assets/      # Static files
│   │   └── App.jsx
│   ├── public/       # Static files served by the frontend
│   └── vite.config.js
└── database/         # Database schema and migration files
```

---

## **API Endpoints**

### Backend Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/devices` | Fetches all registered vehicles |
| GET | `/api/positions` | Retrieves real-time positions |
| GET | `/api/events` | Fetches event alerts |
| GET | `/api/reports/summary` | Generates trip summaries |

---

## **Development Notes**

- **Traccar API Limitations**: Be aware of rate limits and authentication requirements when using the Traccar API.
- **Supabase Free Tier**: Limited database storage and performance; consider upgrading for production use.
- **Map Integration**: Use Mapbox for optimal performance. Replace with Leaflet if cost constraints exist.

---

## **Contributing**

1. Fork the repository.

2. Create a new feature branch:
```bash
git checkout -b feature-name
```

3. Commit your changes and push to the branch:
```bash
git add .
git commit -m "Add new feature"
git push origin feature-name
```