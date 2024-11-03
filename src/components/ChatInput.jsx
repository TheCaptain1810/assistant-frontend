/* eslint-disable react/prop-types */
export default function ChatInput({ command, onCommandChange, onSendCommand, onSpeechInput, recognizing, onStopResponse }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSendCommand();
    }
  };

  return (
    <section className="input_box flex justify-between rounded-full w-full max-w-[900px] p-3 mb-3 mx-4">
      <input
        type="text"
        value={command}
        onChange={onCommandChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter your command"
        className="ml-2 mr-3 flex-1 min-w-0"
      />
      <div className="flex-shrink-0">
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 bg-blue-500 hover:bg-blue-700" onClick={onSendCommand}>
          <i className="fa-solid fa-paper-plane text-sm md:text-base"></i>
        </button>
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 bg-blue-500 hover:bg-blue-700" onClick={onSpeechInput}>
          {recognizing ? 
            <i className="fa-solid fa-microphone-lines text-sm md:text-base"></i> : 
            <i className="fa-solid fa-microphone text-sm md:text-base"></i>
          }
        </button>
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 bg-red-500 hover:bg-red-700" onClick={onStopResponse}>
          <i className="fa-solid fa-stop text-sm md:text-base"></i>
        </button>
      </div>
    </section>
  );
}
