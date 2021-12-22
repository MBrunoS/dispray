import Container from "react-bootstrap/Container";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";
import Projection from "./pages/Projection";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route
          exact
          path="/"
          element={
            <Container fluid className="app">
              <Home />
            </Container>
          }
        /> */}
        <Route
          exact
          path="/"
          element={
            <Container fluid className="app">
              <Meeting />
            </Container>
          }
        />
        <Route exact path="/projection" element={<Projection />} />
      </Routes>
    </Router>
  );
}

export default App;
