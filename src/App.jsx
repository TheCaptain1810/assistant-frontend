import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [recognizing, setRecognizing] = useState(false);

  const handleCommandChange = (e) => {
    setCommand(e.target.value);
  };

  const handleSendCommand = async () => {
    try {
      const res = await axios.post('http://localhost:5000/command', { command });
      setResponse(res.data.response);
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
    <div style={{ padding: '20px' }}>
      <h1>AI Assistant</h1>
      <input
        type="text"
        value={command}
        onChange={handleCommandChange}
        placeholder="Enter your command"
        style={{ width: '300px', padding: '10px' }}
      />
      <button onClick={handleSendCommand} style={{ marginLeft: '10px', padding: '10px' }}>
        Send
      </button>
      <button onClick={handleSpeechInput} style={{ marginLeft: '10px', padding: '10px' }}>
        {recognizing ? 'Listening...' : 'Listen'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default App;
