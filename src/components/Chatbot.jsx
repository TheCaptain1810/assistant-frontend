/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatInterface from './ChatInterface';
import ChatInput from './ChatInput';

export default function Chatbot() {
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');
    const [recognizing, setRecognizing] = useState(false);
    const typingIntervalRef = useRef(null);
    const recognitionRef = useRef(null);
    const synthRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [currentResponse, setCurrentResponse] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
      synthRef.current = window.speechSynthesis;
      return () => {
        if (synthRef.current) {
          synthRef.current.cancel();
        }
      };
    }, []);

    const handleCommandChange = (e) => {
      setCommand(e.target.value);
    };

    const typeResponse = (text) => {
      let index = 0;
      setCurrentResponse(text.charAt(index));
      clearInterval(typingIntervalRef.current);

      typingIntervalRef.current = setInterval(() => {
        if (index < text.length) {
          setCurrentResponse((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(typingIntervalRef.current);
          setChatHistory(prevHistory => [
            ...prevHistory,
            { type: 'assistant', content: text }
          ]);
          setCurrentResponse('');
          setIsTyping(false);
        }
      }, 80);
    };

    const speakResponse = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      synthRef.current.speak(utterance);
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

      recognitionRef.current = recognition;
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
        setChatHistory(prevHistory => [
          ...prevHistory,
          { type: 'user', content: commandToSend }
        ]);

        const res = await axios.post('http://localhost:5000/command', { command: commandToSend });
        const newResponse = res.data.response;
        
        setIsTyping(true);
        typeResponse(newResponse);
        speakResponse(newResponse);
      } catch (error) {
        console.error('Error sending command:', error);
        const errorMessage = 'Error sending command.';
        
        setChatHistory(prevHistory => [
          ...prevHistory,
          { type: 'assistant', content: errorMessage }
        ]);
        setCurrentResponse(errorMessage);
        setIsTyping(false);
      } finally {
        setCommand(''); // Clear the input after sending
      }
    };

    const handleStopResponse = () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        setRecognizing(false);
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      setResponse((prevResponse) => prevResponse + ' [Stopped]');
    };
  
    return (
      <main className="chatbot flex flex-col items-center rounded-3xl m-5 h-full">
        <ChatInterface 
          chatHistory={chatHistory} 
          currentResponse={currentResponse} 
          isTyping={isTyping}
        />
        <ChatInput
          command={command}
          onCommandChange={handleCommandChange}
          onSendCommand={() => handleSendCommand(command)}
          onSpeechInput={handleSpeechInput}
          recognizing={recognizing}
          onStopResponse={handleStopResponse}
        />
      </main>
    );
}
