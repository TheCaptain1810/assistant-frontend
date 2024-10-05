import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ConversationHistory() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        console.log('Fetching conversations...');
        const response = await axios.get('http://localhost:5000/conversations');
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

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="conversation-history-container m-5 p-5 rounded-3xl text-white">
      <h2 className="text-2xl font-bold mb-4">Conversation History</h2>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        conversations.map((conversation, index) => (
          <div key={conversation._id} className="mb-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Conversation {index + 1}</h3>
            <div className="mb-2 text-blue-300">
              <span className="font-bold">You: </span>
              {conversation.user_input}
            </div>
            <div className="mb-2 text-green-300">
              <span className="font-bold">Assistant: </span>
              {conversation.assistant_response}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(conversation.timestamp).toLocaleString()}
            </div>
          </div>
        ))
      )}
      <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Assistant
      </Link>
    </div>
  );
}
