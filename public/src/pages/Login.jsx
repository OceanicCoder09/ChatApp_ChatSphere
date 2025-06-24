import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };
  
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_API_URL)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_API_URL,
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", toastOptions);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <div className="header">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatSphere</h1>
          </div>
          <p>Connect with your world</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              minLength="3"
              placeholder="Enter your username"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          
          <div className="footer">
            <span>
              Don't have an account? <Link to="/register">Sign up</Link>
            </span>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
        </form>
      </FormContainer>
      
      <ToastContainer />
      <BackgroundBubbles>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`bubble bubble-${i}`} />
        ))}
      </BackgroundBubbles>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
`;

const FormContainer = styled.div`
  width: 90%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  padding: 2.5rem;
  z-index: 10;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
    
    .brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 0.5rem;
      
      img {
        height: 2.5rem;
      }
      
      h1 {
        color: #4a4a4a;
        font-size: 1.8rem;
        font-weight: 700;
        margin: 0;
      }
    }
    
    p {
      color: #6b7280;
      margin: 0;
      font-size: 0.9rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      label {
        color: #4a4a4a;
        font-size: 0.9rem;
        font-weight: 500;
      }
      
      input {
        padding: 0.8rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s;
        background-color: rgba(255, 255, 255, 0.8);
        
        &:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }
        
        &::placeholder {
          color: #9ca3af;
        }
      }
    }
    
    button {
      padding: 0.8rem;
      background: linear-gradient(to right, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      margin-top: 0.5rem;
      
      &:hover {
        background: linear-gradient(to right, #5a6fd1, #6a4296);
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      &:disabled {
        background: #cccccc;
        cursor: not-allowed;
        transform: none;
      }
    }
    
    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      
      span {
        color: #6b7280;
        font-size: 0.9rem;
        
        a {
          color: #667eea;
          font-weight: 500;
          text-decoration: none;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
      
      .forgot-password {
        color: #6b7280;
        font-size: 0.8rem;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
          color: #667eea;
        }
      }
    }
  }
`;

const BackgroundBubbles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;

  .bubble {
    position: absolute;
    bottom: -100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: rise 15s infinite ease-in;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
      border-radius: 50%;
    }

    @keyframes rise {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
      }
    }
  }

  ${[...Array(10)].map((_, i) => `
    .bubble-${i} {
      width: ${Math.random() * 60 + 20}px;
      height: ${Math.random() * 60 + 20}px;
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 5}s;
      animation-duration: ${Math.random() * 20 + 10}s;
    }
  `).join('')}
`;