import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import About from "./components/About";
import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
