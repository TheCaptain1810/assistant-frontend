/* eslint-disable react/prop-types */
export default function ChatInterface({ response }) {
  return (
    <section className="response flex flex-1 rounded-xl m-4">
      <p className='p-5'>{response}</p>
    </section>
  );
}
