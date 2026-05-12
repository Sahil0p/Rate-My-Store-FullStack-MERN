import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { user } = useAuth();

  // 🔁 Redirect logged-in users to their dashboard
  if (user) {
    if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" />;
    if (user.role === "OWNER") return <Navigate to="/owner/dashboard" />;
    if (user.role === "USER") return <Navigate to="/user/stores" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800
                    flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4">
        Discover, Review & Improve Local Stores
      </h1>

      <p className="text-lg text-gray-300 max-w-2xl">
        RateMyStore helps customers find the best stores and helps
        business owners grow using real feedback.
      </p>

      <div className="flex gap-4 mt-8">
        <Link to="/signup" className="btn-primary">
          Get Started
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 rounded-full border border-blue-400
                     text-blue-400 hover:bg-blue-400 hover:text-white
                     transition"
        >
          Log In
        </Link>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038725.png"
        alt="store"
        className="mt-10 w-52 opacity-90 animate-page-enter"
      />
    </div>
  );
}
