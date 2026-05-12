import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for does not exist.
      </p>

      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
}
