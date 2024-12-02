import React, { useState } from 'react';
import { Layout, Row, Col } from 'antd';
import VehicleList from './components/VehicleList';
import VehicleMap from './components/VehicleMap';
import VehicleForm from './components/VehicleForm';
import './App.css';

const { Header, Content } = Layout;

const App = () => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleVehicleSelect = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

    const handleVehicleAdded = () => {
        // Logic to refresh vehicle list or fetch vehicles again
    };

    return (
        <Layout className="layout">
            <Header>
                <h1 style={{ color: 'white' }}>Vehicle Tracking System</h1>
            </Header>
            <Content style={{ padding: '24px' }}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={8}>
                        <VehicleForm onVehicleAdded={handleVehicleAdded} />
                        <VehicleList onVehicleSelect={handleVehicleSelect} />
                    </Col>
                    <Col xs={24} lg={16}>
                        <div style={{ height: '500px', background: '#fff', padding: '24px' }}>
                            <VehicleMap selectedVehicle={selectedVehicle} />
                        </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default App;