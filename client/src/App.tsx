import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './screens/Home';

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <main>
          <Container>
            <Home />
          </Container>
        </main>
        <Footer />
      </>

    </div>
  );
}

export default App;
