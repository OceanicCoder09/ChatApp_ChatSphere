import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket, currentUser }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.post(recieveMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchMessages();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    setMessages([...messages, { fromSelf: true, message: msg }]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainerWrapper>
      <div className="chat-header">
        <div className="user-info">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt={currentChat.username}
            />
          </div>
          <div className="user-details">
            <h3>{currentChat.username}</h3>
            <p className="status">Online</p>
          </div>
        </div>
        <Logout />
      </div>
      
      <div className="message-container">
        {messages.map((message) => (
          <div ref={scrollRef} key={uuidv4()} className="message-wrapper">
            <div
              className={`message-bubble ${
                message.fromSelf ? "sent" : "received"
              }`}
            >
              <p>{message.message}</p>
              <span className="time">10:30 AM</span>
            </div>
          </div>
        ))}
      </div>
      
      <ChatInput handleSendMsg={handleSendMsg} />
    </ChatContainerWrapper>
  );
}

const ChatContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f9fafb;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: white;

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        margin-right: 1rem;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .user-details {
        h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.25rem 0;
        }

        .status {
          font-size: 0.8rem;
          color: #10b981;
          margin: 0;
        }
      }
    }
  }

  .message-container {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border-radius: 3px;
    }

    .message-wrapper {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
    }

    .message-bubble {
      max-width: 70%;
      padding: 0.75rem 1rem;
      border-radius: 1rem;
      position: relative;
      font-size: 0.95rem;
      line-height: 1.4;

      p {
        margin: 0;
      }

      .time {
        display: block;
        font-size: 0.7rem;
        color: #6b7280;
        margin-top: 0.25rem;
        text-align: right;
      }

      &.sent {
        align-self: flex-end;
        background-color: #667eea;
        color: white;
        border-bottom-right-radius: 0.25rem;

        .time {
          color: rgba(255, 255, 255, 0.7);
        }
      }

      &.received {
        align-self: flex-start;
        background-color: white;
        color: #374151;
        border: 1px solid #e5e7eb;
        border-bottom-left-radius: 0.25rem;
      }
    }
  }
`;