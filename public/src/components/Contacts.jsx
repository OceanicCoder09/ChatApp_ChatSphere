import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat, currentUser }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <ContactsContainer>
      {/* <div className="contacts-header">
        <img src={Logo} alt="ChatSphere logo" className="logo" />
        <h2>ChatSphere</h2>
      </div> */}
      
      <div className="contacts-list">
        {contacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`contact-item ${
              index === currentSelected ? "selected" : ""
            }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="contact-avatar">
              <img
                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                alt={contact.username}
              />
            </div>
            <div className="contact-info">
              <h3>{contact.username}</h3>
              <p className="last-message">Last message preview...</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="current-user-profile">
        <div className="user-avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
            alt={currentUser.username}
          />
        </div>
        <div className="user-info">
          <h3>{currentUser.username}</h3>
          <p className="status">Online</p>
        </div>
      </div>
    </ContactsContainer>
  );
}

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  border-right: 1px solid #e5e7eb;

  .contacts-header {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;

    .logo {
      height: 2rem;
      margin-right: 0.75rem;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }
  }

  .contacts-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border-radius: 3px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 0.5rem;

      &:hover {
        background-color: #f3f4f6;
      }

      &.selected {
        background-color: #e0e7ff;
      }

      .contact-avatar {
        margin-right: 1rem;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .contact-info {
        flex: 1;
        overflow: hidden;

        h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.25rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .last-message {
          font-size: 0.8rem;
          color: #6b7280;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .current-user-profile {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background-color: white;

    .user-avatar {
      margin-right: 1rem;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .user-info {
      h3 {
        font-size: 0.95rem;
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
`;