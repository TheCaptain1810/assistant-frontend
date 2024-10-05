/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function ChatInterface({ chatHistory, currentResponse, isTyping }) {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, currentResponse]);

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
        <SyntaxHighlighter 
          key={match.index}
          language={language} 
          style={docco}
          className="rounded-md my-2"
        >
          {code}
        </SyntaxHighlighter>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < message.length) {
      parts.push(message.slice(lastIndex));
    }

    return parts;
  };

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
              {formatMessage(message.content)}
            </div>
          </div>
        ))}
        {isTyping && currentResponse && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg bg-gray-200 text-black">
              {formatMessage(currentResponse)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
