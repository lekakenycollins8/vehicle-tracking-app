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
        <Menu mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<CarOutlined />}>
            <Link to="/dashboard/vehicles">Vehicles</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BellOutlined />}>
            <Link to="/dashboard/alerts">Alerts</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CompassOutlined />}>
            <Link to="/dashboard/trips">Trips</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<HistoryOutlined />}>
            <Link to="/dashboard/history">History</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<PlusOutlined />}>
            <Link to="/dashboard/vehicles/create">Create Vehicle</Link>
          </Menu.Item>
        </Menu>
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