import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import GlobalStyle from "./styles/GlobalStyle";
import BookingPage from "./components/BookingPage";
import "./styles/booking.css";
import "./styles/bookedtimes.css";
import GetBookings from "./components/GetBookings";
import Header from "./components/Header"; // Import Header

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router>
        <Header /> {/* Place Header within Router */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/user/dashboard"
              element={
                <RequireAuth allowedRoles={["USER"]}>
                  <UserDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <RequireAuth allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/GetBookings"
              element={
                <RequireAuth allowedRoles={["ADMIN"]}>
                  <GetBookings />
                </RequireAuth>
              }
            />

            <Route
              path="/booking"
              element={
                <RequireAuth allowedRoles={["USER", "ADMIN"]}>
                  <BookingPage />
                </RequireAuth>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
