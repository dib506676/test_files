import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold">Portfolio</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Search</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar