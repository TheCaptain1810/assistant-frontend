import { useState } from 'react';
import axios from 'axios';
import ChatInterface from './ChatInterface';
import ChatInput from './ChatInput';

export default function Chatbot() {
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');
    const [recognizing, setRecognizing] = useState(false);
  
    const handleCommandChange = (e) => {
      setCommand(e.target.value);
    };

    const typeResponse = (text) => {
      let index = 0;
      setResponse(text.charAt(index)); // Clear the response before typing

      const typingInterval = setInterval(() => {
        setResponse((prev) => prev + text.charAt(index)); // Add next character
        index++;
        
        if (index === text.length) {
          clearInterval(typingInterval); // Stop typing when done
        }
      }, 50); // Adjust typing speed (milliseconds per character)
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
        setRecognizing(false);
        handleSendCommand(speechResult);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event);
        if (event.error === 'no-speech') {
          typeResponse('No speech was detected. Please try again.');
        } else {
          typeResponse(`Error recognizing speech: ${event.error}`);
        }
        setRecognizing(false);
      };

      recognition.onspeechend = () => {
        setRecognizing(false);
        recognition.stop();
      };

      // Add a timeout to stop recognition if no speech is detected
      const timeout = setTimeout(() => {
        if (recognizing) {
          recognition.stop();
          typeResponse('No speech detected. Please try again.');
          setRecognizing(false);
        }
      }, 10000); // 10 seconds timeout

      setRecognizing(true);
      recognition.start();

      // Clean up the timeout when recognition ends
      recognition.onend = () => {
        clearTimeout(timeout);
      };
    };

    const handleSendCommand = async (commandToSend) => {
      if (!commandToSend) return; // Avoid sending empty commands

      try {
        const res = await axios.post('http://localhost:5000/command', { command: commandToSend });
        typeResponse(res.data.response);
      } catch (error) {
        console.error('Error sending command:', error);
        typeResponse('Error sending command.');
      } finally {
        setCommand(''); // Clear the input after sending
      }
    };
  
    return (
      <main className="chatbot flex flex-col items-center rounded-3xl m-5 h-full">
        <ChatInterface response={response} />
        <ChatInput
          command={command}
          onCommandChange={handleCommandChange}
          onSendCommand={() => handleSendCommand(command)}
          onSpeechInput={handleSpeechInput}
          recognizing={recognizing}
        />
      </main>
    );
}
