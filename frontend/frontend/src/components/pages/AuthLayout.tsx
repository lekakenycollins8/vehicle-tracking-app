import React from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledHeader = styled(Header)`
  background: transparent;
  text-align: center;
  padding: 2rem 0;
`;

const Logo = styled.img`
  max-width: 200px;
  margin-bottom: 1rem;
`;

const StyledContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: transparent;
`;

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <StyledLayout>
    <StyledHeader>
      <Logo src="/car.png" alt="Vehicle Tracking System" style={{ maxWidth: "150px" }} />
      <Title level={5} style={{ marginBottom: '2rem' }}>{title}</Title>
    </StyledHeader>
      <StyledContent>
        <FormWrapper>{children}</FormWrapper>
      </StyledContent>
      <StyledFooter>
        <a href="/forgot-password">Forgot Password?</a> | <a href="/contact-support">Contact Support</a>
      </StyledFooter>
    </StyledLayout>
  );
};

export default AuthLayout;

