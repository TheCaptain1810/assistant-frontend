import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // Import the CSS file

const App = () => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [sendCommandFlag, setSendCommandFlag] = useState(false);

  useEffect(() => {
    if (sendCommandFlag && command !== '') {
      handleSendCommand();
      setSendCommandFlag(false); // Reset flag after sending the command
    }
  }, [sendCommandFlag, command]);

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const handleSendCommand = async () => {
    try {
      const res = await axios.post('http://localhost:5000/command', { command });
      setResponse(res.data.response);
      setCommand('');  // Clear the input after sending
    } catch (error) {
      console.error('Error sending command:', error);
      setResponse('Error sending command.');
    }
  };

  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setCommand(speechResult);
      setSendCommandFlag(true);  // Trigger sending the command
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
      setResponse('Error recognizing speech.');
    };

    recognition.onspeechend = () => {
      setRecognizing(false);
      recognition.stop();
    };

    setRecognizing(true);
    recognition.start();
  };

  return (
    <div className="container">
      <h1 className="title">AI Assistant</h1>
      <div className="input-container">
        <input
          type="text"
          value={command}
          onChange={handleCommandChange}
          placeholder="Enter your command"
          className="input"
        />
        <button className="button" onClick={handleSendCommand}>
          Send
        </button>
        <button className="button" onClick={handleSpeechInput}>
          {recognizing ? 'Listening...' : 'Listen'}
        </button>
      </div>
      <div className="response-container">
        <h2>Response:</h2>
        <div className="response-box">
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
