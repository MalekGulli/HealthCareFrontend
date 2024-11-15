import styled from "styled-components";
import Logo from "../assets/health_care_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1900px;
  padding: 20px 30px;
  background-color: #333;

  color: #fff;
  margin: 0 auto;
  width: calc(100% -);
  height: 60px;
`;
const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2fadaa;
  transition: color 0.3s ease;
  &:hover {
    color: #fff;
  }
`;
const LogoImage = styled.img`
  height: 70px;
  width: auto;
  margin-right: 10px;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
  &:hover {
    color: #2fadaa;
  }
`;

const Header = () => {
  const { authState, setAuthState } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state and redirect to login page
    setAuthState(null);
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <LogoImage src={Logo} alt="Health Care Logo" />
        <span>Health Care</span>
      </LogoContainer>
      <NavLinks>
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {authState?.isAuthenticated ? (
          <NavLink to={authState.roles.includes("USER") ?  "/user/dashboard" : "/admin/dashboard"}>Profile</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        {authState?.isAuthenticated ? (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            <br/> 
            Logout
          </button>
        ) : (
          <NavLink to="/register">Register</NavLink>
        )}
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
