import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Planto from "./Planto/Planto";
import Indoor from "./components/Pages/Indoor"; // or "./pages/Indoor" depending on your structure
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Planto />} />
        <Route path="/indoor" element={<Indoor />} />
      </Routes>
    </Router>
  );
}

export default App;