import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/project/:title" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}
