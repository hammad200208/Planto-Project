import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Planto from "./Planto/Planto";
import Indoor from "./components/Pages/Indoor";
import Outdoor from "./components/Pages/Outdoor";
import Succulents from "./components/Pages/Succulents";
import Contact from "./components/Pages/Contact";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import AuthProvider from "./Context/AuthProvider"; // ✅ Corrected
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Planto />} />
          <Route path="/indoor" element={<Indoor />} />
          <Route path="/outdoor" element={<Outdoor />} />
          <Route path="/succulents" element={<Succulents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
