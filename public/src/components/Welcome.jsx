import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <WelcomeContainer>
      <div className="welcome-content">
        <img src={Robot} alt="Welcome robot" className="welcome-image" />
        <h1 className="welcome-title">
          Welcome, <span>{userName}!</span>
        </h1>
        <p className="welcome-subtitle">
          Select a contact to start chatting or create a new conversation.
        </p>
      </div>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f9fafb;
  padding: 2rem;

  .welcome-content {
    text-align: center;
    max-width: 500px;
  }

  .welcome-image {
    height: 200px;
    margin-bottom: 2rem;
    border-radius: 50%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .welcome-title {
    font-size: 2rem;
    color: #374151;
    margin-bottom: 1rem;
    font-weight: 600;

    span {
      color: #667eea;
      font-weight: 700;
    }
  }

  .welcome-subtitle {
    font-size: 1.1rem;
    color: #6b7280;
    line-height: 1.6;
  }
`;