import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CarOutlined, BellOutlined, CompassOutlined, HistoryOutlined, PlusOutlined } from '@ant-design/icons';
import { logout } from '../../authActions';
import { useDispatch } from 'react-redux';
import '../styles/Dashboard.css';

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
      dispatch(logout());
      navigate('/'); // Redirect to login page after logout
  };

  return (
    <Layout className="dashboard-layout">
      <Sider
        width={200}
        className="dashboard-sider"
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
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
      <Layout style={{ padding: '0 24px 24px' }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Button type="primary" onClick={handleLogout} style={{ float: 'right', margin: '16px' }}>Logout</Button>
        </Header>
        <Content
          style={{ padding: 24, margin: 0, minHeight: 280 }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;