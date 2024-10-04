/* eslint-disable react/prop-types */
export default function ChatHistory({ chatHistory }) {
  return (
    <div className="chat-history w-full max-h-[60vh] overflow-y-auto mb-4">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-2 rounded ${
            message.type === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100'
          }`}
        >
          <span className="font-bold">{message.type === 'user' ? 'You: ' : 'Assistant: '}</span>
          {message.content}
        </div>
      ))}
    </div>
  );
}
