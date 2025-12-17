import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Chat from "./pages/Chat";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LearnMore from "./pages/LearnMore";
import { PrivateRoute,PublicRoute } from "./routes/RouteGuards";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/learn" element={<LearnMore />} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/app" element={<PrivateRoute><Chat /></PrivateRoute>} />
    </Routes>
  );
}
