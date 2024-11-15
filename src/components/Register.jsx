import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RegisterButton = styled.button`
  cursor: pointer;
  padding: 10px 30px;
  background-color: #057d7a;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-top: 40px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;
  text-align: center;
  border: none;

  &:hover {
    background-color: #2fadaa;
    transform: translateY(-3px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 36px;
  color: #333;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(45deg, #057d7a, #8a2be2);
  -webkit-background-clip: text;
  color: transparent;
  padding: 10px 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  line-height: 1.5;
`;
const FormWrapper = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 350px;
  gap: 10px;
  margin-top: 15px;
`;

const StyledInput = styled.input`
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #fafafa;
  border-radius: 5px;
  padding: 5px 0px;

  &:focus {
    outline: none;
  }
`;

function Register() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        userDetails,
        {
          withCredentials: true,
        }
      );

      console.log("REGISTER RESPONSE: " + JSON.stringify(response.data));

      window.console.log("resgiater succesfull .");

      // Redirect to login page or a success page
      navigate("/user", { replace: true });
    } catch (error) {
      setError("Registration failed.");
    }
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <FormWrapper onSubmit={handleRegister}>
        <label>First Name: </label>
        <StyledInput
          name="firstName"
          type="text"
          value={userDetails.firstName}
          onChange={handleInputChange}
          required
        />
        <label>Last Name: </label>
        <StyledInput
          name="lastName"
          type="text"
          value={userDetails.lastName}
          onChange={handleInputChange}
          required
        />
        <label>Email: </label>
        <StyledInput
          name="email"
          type="email"
          value={userDetails.email}
          onChange={handleInputChange}
          required
        />
        <label>Username: </label>
        <StyledInput
          name="username"
          type="text"
          value={userDetails.username}
          onChange={handleInputChange}
          required
        />
        <label>Password: </label>
        <StyledInput
          name="password"
          type="password"
          value={userDetails.password}
          onChange={handleInputChange}
          required
        />
        <label>Confirm Password: </label>
        <StyledInput
          name="password"
          type="password"
          value={userDetails.password}
          onChange={handleInputChange}
          required
        />
        <RegisterButton type="submit">Register</RegisterButton>
      </FormWrapper>
    </RegisterContainer>
  );
}
export default Register;
