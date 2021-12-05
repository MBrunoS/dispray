import Container from "react-bootstrap/Container";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Container fluid className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/meeting" element={<Meeting />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
