import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import About from "./components/About";
import Contact from './components/Contact';
import ConversationHistory from './components/ConversationHistory';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full">
        <Header />
        <div className="h-[calc(100vh-4rem)]">
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/history" element={<ConversationHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
