import { useState } from 'react';
import axios from 'axios';

export default function Chatbot() {
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');
    const [recognizing, setRecognizing] = useState(false);
  
    const handleCommandChange = (e) => {
      setCommand(e.target.value);
    };
  
    const handleSendCommand = async () => {
      if (!command) return; // Avoid sending empty commands
  
      try {
        const res = await axios.post('http://localhost:5000/command', { command });
        setResponse(res.data.response);
      } catch (error) {
        console.error('Error sending command:', error);
        setResponse('Error sending command.');
      } finally {
        setCommand(''); // Clear the input after sending
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
        setRecognizing(false);  // Stop recognizing when result is obtained
      };
  
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event);
        setResponse('Error recognizing speech.');
        setRecognizing(false);
      };
  
      recognition.onspeechend = () => {
        setRecognizing(false);
        recognition.stop();
      };
  
      setRecognizing(true);
      recognition.start();
    };
  
    return (
      <main className="flex flex-col items-center justify-center">
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
      </main>
    );
}
