import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      
      if (user?._id) {
        await axios.get(`${logoutRoute}/${user._id}`);
      }
      
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/login");
    }
  };

  return (
    <LogoutButton onClick={handleClick} title="Logout">
      <BiPowerOff />
    </LogoutButton>
  );
}

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50%;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  cursor: pointer;
  transition: all 0.2s;
  color: #6c757d;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: #f1f3f5;
    color: #dc3545;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;