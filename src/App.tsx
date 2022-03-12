import Container from "react-bootstrap/Container";
import Meeting from "./pages/Meeting";
import Projection from "./pages/Projection";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Container fluid className="app">
              <Meeting />
            </Container>
          }
        />
        <Route path="/projection" element={<Projection />} />
      </Routes>
    </Router>
  );
}

export default App;
