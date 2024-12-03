import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import VehicleList from './components/VehicleList';
import VehicleAlerts from './components/VehicleAlerts';
import VehicleTrips from './components/VehicleTrips';
import VehicleHistory from './components/VehicleHistory';
import VehicleMap from './components/VehicleMap';
import VehicleDetail from './components/VehicleDetail';
import VehicleEvents from './components/VehicleEvents';
import VehicleForm from './components/VehicleForm';
import VehicleUpdateForm from './components/VehicleUpdateForm';
import LoginForm from './components/pages/LoginForm';
import RegisterForm from './components/pages/RegistrationForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="vehicles" element={<VehicleList />} />
                    <Route path="alerts" element={<VehicleAlerts />} />
                    <Route path="trips" element={<VehicleTrips />} />
                    <Route path="history" element={<VehicleHistory />} />
                    <Route path="vehicles/:id" element={<VehicleDetail />} />
                    <Route path="vehicles/:id/map" element={<VehicleMap />} />
                    <Route path="vehicles/:id/events" element={<VehicleEvents />} />
                    <Route path="vehicles/create" element={<VehicleForm />} />
                    <Route path="vehicles/:id/update" element={<VehicleUpdateForm />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;