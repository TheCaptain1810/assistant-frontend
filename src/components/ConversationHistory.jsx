import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function ConversationHistory() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        console.log('Fetching conversations...');
        const response = await axios.get('http://127.0.0.1:5000/conversations');
        console.log('Received data:', response.data);
        setConversations(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to fetch conversations: ' + err.message);
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const formatMessage = (message) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message)) !== null) {
      if (match.index > lastIndex) {
        parts.push(message.slice(lastIndex, match.index));
      }
      const language = match[1] || 'plaintext';
      const code = match[2].trim();
      parts.push(
        <div key={match.index} className="relative">
          <SyntaxHighlighter 
            language={language} 
            style={docco}
            className="rounded-md my-2"
          >
            {code}
          </SyntaxHighlighter>
          <button
            onClick={() => copyToClipboard(code)}
            className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
          >
            Copy
          </button>
        </div>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < message.length) {
      parts.push(message.slice(lastIndex));
    }

    return parts;
  };

  if (loading) return <div className="text-white flex flex-col items-center text-center m-3">
    <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Back to Assistant
    </Link>
    Loading...
  </div>;

  if (error) return <div className="text-white flex flex-col items-center text-center m-3">
    <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Back to Assistant
    </Link>
    Error: {error}
  </div>;

  return (
    <div className="conversation-history-container m-2 md:m-5 p-3 md:p-5 rounded-3xl text-white">
      <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
        Back to Assistant
      </Link>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Conversation History</h2>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        conversations.map((conversation, index) => (
          <div key={conversation._id} className="mb-4 p-3 md:p-4 bg-gray-800 rounded-lg text-sm md:text-base">
            <h3 className="text-xl font-semibold mb-2">Conversation {index + 1}</h3>
            <div className="mb-2 text-blue-300">
              <span className="font-bold">You: </span>
              {formatMessage(conversation.user_input)}
            </div>
            <div className="mb-2 text-green-300">
              <span className="font-bold">Assistant: </span>
              {formatMessage(conversation.assistant_response)}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(conversation.timestamp).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
