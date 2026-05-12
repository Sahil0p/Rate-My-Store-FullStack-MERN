import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UpdatePassword from "../pages/UpdatePassword";
import NotFound from "../pages/NotFound";

import UserStores from "../pages/user/UserStores";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageStores from "../pages/admin/ManageStores";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AdminRatings from "../pages/admin/AdminRatings";


import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/user/stores"
        element={
          <ProtectedRoute role="USER">
            <UserStores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="ADMIN">
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute role="ADMIN">
            <ManageStores />
          </ProtectedRoute>
        }
      />
      
      <Route path="/admin/ratings" element={<AdminRatings />} />


      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
