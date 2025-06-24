import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Logo from "../assets/logo.svg";
export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (!localStorage.getItem(process.env.REACT_APP_API_URL)) {
        navigate("/login");
      } else {
        const userData = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_API_URL)
        );
        setCurrentUser(userData);
        setIsLoading(false);
      }
    }
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    fetchContacts();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <ChatAppContainer>
      <SidebarContainer>
        <AppHeader>
          <img src={Logo} alt="logo" />
          <h1>ChatSphere</h1>
        </AppHeader>
        <Contacts contacts={contacts} changeChat={handleChatChange} currentUser={currentUser} />
      </SidebarContainer>
      
      <MainChatContainer>
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} currentUser={currentUser} />
        )}
      </MainChatContainer>
    </ChatAppContainer>
  );
}

// Styled Components
const LoadingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
`;

const ChatAppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  overflow: hidden;
`;

const SidebarContainer = styled.div`
  width: 300px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
`;

const AppHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  
  img {
    height: 2rem;
    margin-right: 0.75rem;
  }
  
  h1 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
`;

const MainChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  position: relative;
  overflow: hidden;
`;

// You'll need to update your Contacts, Welcome, and ChatContainer components to match this design