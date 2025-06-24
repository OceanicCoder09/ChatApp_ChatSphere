import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMsg(msg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim().length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <InputContainer>
      <EmojiButton onClick={handleEmojiPickerhideShow}>
        <BsEmojiSmileFill />
      </EmojiButton>
      
      {showEmojiPicker && (
        <EmojiPickerContainer>
          <Picker 
            onEmojiClick={handleEmojiClick}
            width={300}
            height={350}
            previewConfig={{ showPreview: false }}
          />
        </EmojiPickerContainer>
      )}
      
      <InputForm onSubmit={sendChat}>
        <MessageInput
          type="text"
          placeholder="Type your message here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <SendButton type="submit">
          <IoMdSend />
        </SendButton>
      </InputForm>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border-top: 1px solid #e9ecef;
  position: relative;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-right: 8px;
  color: #6c757d;
  font-size: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: #667eea;
  }
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 10px;
  z-index: 100;
`;

const InputForm = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 0 12px;
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px 0;
  font-size: 14px;
  color: #495057;
  outline: none;

  &::placeholder {
    color: #adb5bd;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #667eea;
  font-size: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: #5a6fd1;
  }

  &:disabled {
    color: #ced4da;
    cursor: not-allowed;
  }
`;