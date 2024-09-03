import Chatbot from "./components/Chatbot";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Chatbot />
    </div>
  )
};

export default App;
