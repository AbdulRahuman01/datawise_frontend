import { Navigate } from "react-router-dom";

// 🔐 Protect private pages (App)
export function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// 🚫 Block login/signup when logged in
export function PublicRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return isLoggedIn ? <Navigate to="/app" replace /> : children;
}
