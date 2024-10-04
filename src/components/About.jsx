import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-container m-5 p-5 rounded-3xl text-white">
      <h2 className="text-2xl font-bold mb-4">About Our AI Assistant</h2>
      <p className="mb-4">
        Welcome to our AI Assistant! We&apos;ve developed this cutting-edge tool to help streamline your daily tasks and provide intelligent responses to your queries.
      </p>
      <p className="mb-4">
        Our AI Assistant utilizes advanced natural language processing and machine learning algorithms to understand and respond to your commands. Whether you need information, task automation, or just a friendly chat, our assistant is here to help.
      </p>
      <p className="mb-4">
        Key features:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Natural language understanding</li>
        <li>Voice command support</li>
        <li>Intelligent response generation</li>
        <li>Continuous learning and improvement</li>
      </ul>
      <p>
        We&apos;re constantly working to improve and expand the capabilities of our AI Assistant. Your feedback is valuable to us as we strive to create the most helpful and user-friendly AI experience possible.
      </p>
      <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Back to Assistant
      </Link>
    </div>
  );
}
