import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="about-container m-5 p-5 rounded-3xl text-white">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-2">Pranav Pise: 2103111@ritindia.edu</p>
        <p className="mb-2">Tejas Bhoite: 2103092@ritindia.edu</p>
        <p className="mb-2">Vijay Wagh: 2103127@ritindia.edu</p>
        <p className="mb-2">Bhavik Nagare: 2103112@ritindia.edu</p>
        <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Assistant
        </Link>
    </div>
  );
}
