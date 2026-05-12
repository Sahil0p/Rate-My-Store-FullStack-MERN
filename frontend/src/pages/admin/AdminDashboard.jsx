import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import SkeletonCard from "../../components/SkeletonCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  const cards = [
    {
      label: "Users",
      value: stats?.totalUsers,
      path: "/admin/users",
    },
    {
      label: "Stores",
      value: stats?.totalStores,
      path: "/admin/stores",
    },
    {
      label: "Ratings",
      value: stats?.totalRatings,
      path: "/admin/ratings", // ✅ FIXED
    },
  ];

  return (
    <div className="p-6 animate-fadein">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Admin Dashboard
      </h2>

      {/* TOP CARDS */}
      <div className="grid-layout mb-10">
        {!stats
          ? [...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : cards.map((card) => (
              <div
                key={card.label}
                onClick={() => navigate(card.path)}
                className="
                  card text-center cursor-pointer
                  transition transform
                  hover:-translate-y-1 hover:shadow-xl
                  active:scale-95
                "
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.label}
                </p>

                <p className="text-4xl font-bold mt-2">
                  {card.value ?? 0}
                </p>

                <p className="mt-3 text-xs text-blue-500">
                  View details →
                </p>
              </div>
            ))}
      </div>

      {/* DASHBOARD INSIGHTS (fills empty space) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold mb-2">
            Platform Overview
          </h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Users rate stores based on experience</li>
            <li>• Store owners track performance</li>
            <li>• Ratings help improve quality</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">
            Admin Capabilities
          </h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Manage users & owners</li>
            <li>• Create & assign stores</li>
            <li>• Analyze store ratings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
