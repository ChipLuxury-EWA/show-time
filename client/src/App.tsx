import { Container } from "react-bootstrap";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Container>
        <Outlet />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
