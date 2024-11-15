import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LogoContainer = styled.img`
  height: 28rem;
`;

const Title = styled.h2`
  font-size: 22px;
  display: none;
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 30px;
  background-color: #057d7a;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2fadaa;
  }
`;

function UserDashboard() {
  const {
    authState: { user },
  } = useAuth();
  const navigate = useNavigate();

  const handleGoToBooking = () => {
    navigate("/booking");
  };

  return (
    <UserContainer>
      <LogoContainer src={Logo} />
      <Title>User Dashboard</Title>
      <Text>Welcome, {user}!</Text>
      <Button onClick={handleGoToBooking}>Go to Booking</Button>
    </UserContainer>
  );
}

export default UserDashboard;
