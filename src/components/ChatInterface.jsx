/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';

export default function ChatInterface({ chatHistory, currentResponse, isTyping }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, currentResponse]);

  return (
    <section className="chat-interface flex flex-col flex-1 w-full max-w-3xl rounded-xl m-4 overflow-hidden">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg bg-gray-200 text-black">
              {currentResponse}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
