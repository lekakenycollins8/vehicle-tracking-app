import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { CarOutlined, BellOutlined, CompassOutlined, HistoryOutlined, PlusOutlined } from '@ant-design/icons';
import '../styles/Dashboard.css';

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout className="dashboard-layout">
      <Sider width={200} className="dashboard-sider">
        <div className="logo">Vehicle Tracker</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <CarOutlined />,
              label: <Link to="/dashboard/vehicles">Vehicles</Link>,
            },
            {
              key: '2',
              icon: <BellOutlined />,
              label: <Link to="/dashboard/alerts">Alerts</Link>,
            },
            {
              key: '3',
              icon: <CompassOutlined />,
              label: <Link to="/dashboard/trips">Trips</Link>,
            },
            {
              key: '4',
              icon: <HistoryOutlined />,
              label: <Link to="/dashboard/history">History</Link>,
            },
            {
              key: '5',
              icon: <PlusOutlined />,
              label: <Link to="/dashboard/vehicles/create">Create Vehicle</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="dashboard-header">
          <h1>Vehicle Tracking Dashboard</h1>
        </Header>
        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;