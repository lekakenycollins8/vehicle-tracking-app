import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to="/dashboard/vehicles">Vehicles</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/dashboard/alerts">Alerts</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/dashboard/trips">Trips</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/dashboard/history">History</Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Link to="/dashboard/vehicles/create">Create Vehicle</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <h1 style={{ color: 'white', margin: '0' }}>Vehicle Tracking Dashboard</h1>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Outlet /> {/* This will render the nested routes */}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;