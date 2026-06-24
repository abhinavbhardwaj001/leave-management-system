import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistoryPage from "./pages/LeaveHistoryPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import "./App.css";

/** * main app router */
function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* auth routes */}
          <Route path="/" element={<LoginPage />} />

          {/* user routes */}
          <Route path="/user" element={
            <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
          } 
          />
          <Route path="/leave/apply" element={
            <ProtectedRoute><Layout><ApplyLeave /></Layout></ProtectedRoute>
          } 
        />
          <Route path="/leave/my-leaves" element={
            <ProtectedRoute><Layout><LeaveHistoryPage /></Layout></ProtectedRoute>
          } 
        />

          {/* admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute><Layout><AdminPage /></Layout></ProtectedRoute>
          } 
        />
        </Routes>
      </Router>
    </>
  );
}

export default App;
