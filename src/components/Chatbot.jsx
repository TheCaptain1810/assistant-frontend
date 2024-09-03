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
      <main className="chatbot flex flex-col items-center rounded-3xl m-5 h-full">
        <section className="response flex flex-1 rounded-xl m-4">
            <p className='p-5'>{response}</p>
        </section>
        <section className="input_box flex justify-between rounded-full w-[900px] p-3 mb-3">
          <input
            type="text"
            value={command}
            onChange={handleCommandChange}
            placeholder="Enter your command"
            className="ml-5 mr-5"
          />
          <div>
            <button className="w-10 h-10 rounded-full mr-3" onClick={handleSendCommand}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
            <button className="w-10 h-10 rounded-full mr-3" onClick={handleSpeechInput}>
              {recognizing ? 
                <i className="fa-solid fa-microphone-lines"></i> : 
                <i className="fa-solid fa-microphone"></i>
              }
            </button>
          </div>
        </section>
      </main>
    );
}
