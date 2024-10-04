/* eslint-disable react/prop-types */
export default function ChatInput({ command, onCommandChange, onSendCommand, onSpeechInput, recognizing }) {
  return (
    <section className="input_box flex justify-between rounded-full w-[900px] p-3 mb-3">
      <input
        type="text"
        value={command}
        onChange={onCommandChange}
        placeholder="Enter your command"
        className="ml-5 mr-5 w-[650px]"
      />
      <div>
        <button className="w-10 h-10 rounded-full mr-3" onClick={onSendCommand}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
        <button className="w-10 h-10 rounded-full mr-3" onClick={onSpeechInput}>
          {recognizing ? 
            <i className="fa-solid fa-microphone-lines"></i> : 
            <i className="fa-solid fa-microphone"></i>
          }
        </button>
      </div>
    </section>
  );
}