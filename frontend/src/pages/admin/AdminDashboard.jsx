// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../services/api";
// import SkeletonCard from "../../components/SkeletonCard";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/admin/dashboard").then((res) => setStats(res.data));
//   }, []);

//   const cards = [
//     {
//       label: "Users",
//       value: stats?.totalUsers,
//       path: "/admin/users",
//     },
//     {
//       label: "Stores",
//       value: stats?.totalStores,
//       path: "/admin/stores",
//     },
//     {
//       label: "Ratings",
//       value: stats?.totalRatings,
//       path: "/admin/ratings", // ✅ FIXED
//     },
//   ];

//   return (
//     <div className="p-6 animate-fadein">
//       <h2 className="text-2xl font-bold mb-8 text-center">
//         Admin Dashboard
//       </h2>

//       {/* TOP CARDS */}
//       <div className="grid-layout mb-10">
//         {!stats
//           ? [...Array(3)].map((_, i) => (
//               <SkeletonCard key={i} />
//             ))
//           : cards.map((card) => (
//               <div
//                 key={card.label}
//                 onClick={() => navigate(card.path)}
//                 className="
//                   card text-center cursor-pointer
//                   transition transform
//                   hover:-translate-y-1 hover:shadow-xl
//                   active:scale-95
//                 "
//               >
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {card.label}
//                 </p>

//                 <p className="text-4xl font-bold mt-2">
//                   {card.value ?? 0}
//                 </p>

//                 <p className="mt-3 text-xs text-blue-500">
//                   View details →
//                 </p>
//               </div>
//             ))}
//       </div>

//       {/* DASHBOARD INSIGHTS (fills empty space) */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="card">
//           <h3 className="font-semibold mb-2">
//             Platform Overview
//           </h3>
//           <ul className="text-sm text-gray-400 space-y-1">
//             <li>• Users rate stores based on experience</li>
//             <li>• Store owners track performance</li>
//             <li>• Ratings help improve quality</li>
//           </ul>
//         </div>

//         <div className="card">
//           <h3 className="font-semibold mb-2">
//             Admin Capabilities
//           </h3>
//           <ul className="text-sm text-gray-400 space-y-1">
//             <li>• Manage users & owners</li>
//             <li>• Create & assign stores</li>
//             <li>• Analyze store ratings</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import SkeletonCard from "../../components/SkeletonCard";

import {
  Users,
  Store,
  Star,
  ArrowRight,
  ShieldCheck,
  Activity,
  TrendingUp,
  Database,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/admin/dashboard");
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  // ================= DASHBOARD CARDS =================
  const cards = [
    {
      label: "Users",
      value: stats?.totalUsers || 0,
      path: "/admin/users",
      icon: Users,
      gradient:
        "from-blue-500 to-indigo-600",
      bg:
        "bg-blue-100 dark:bg-blue-500/20",
      text:
        "text-blue-600 dark:text-blue-300",
    },

    {
      label: "Stores",
      value: stats?.totalStores || 0,
      path: "/admin/stores",
      icon: Store,
      gradient:
        "from-purple-500 to-pink-600",
      bg:
        "bg-purple-100 dark:bg-purple-500/20",
      text:
        "text-purple-600 dark:text-purple-300",
    },

    {
      label: "Ratings",
      value: stats?.totalRatings || 0,
      path: "/admin/ratings",
      icon: Star,
      gradient:
        "from-yellow-400 to-orange-500",
      bg:
        "bg-yellow-100 dark:bg-yellow-500/20",
      text:
        "text-yellow-600 dark:text-yellow-300",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] p-4 md:p-8 transition-colors duration-300">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 shadow-2xl mb-10">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldCheck className="text-white" size={28} />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                Admin Dashboard
              </h1>

              <p className="text-white/80 mt-2 text-lg">
                Monitor users, stores, and ratings across
                the platform.
              </p>
            </div>
          </div>
        </div>

        {/* GLOW EFFECT */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {!stats
          ? [...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  onClick={() =>
                    navigate(card.path)
                  }
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    bg-white dark:bg-slate-900
                    border border-gray-200 dark:border-slate-800
                    shadow-lg
                    hover:shadow-2xl
                    dark:hover:shadow-indigo-500/20
                    transition-all
                    duration-300
                    cursor-pointer
                    hover:-translate-y-2
                  "
                >
                  {/* TOP GRADIENT */}
                  <div
                    className={`
                      h-2
                      bg-gradient-to-r
                      ${card.gradient}
                    `}
                  />

                  <div className="p-6">
                    {/* ICON */}
                    <div
                      className={`
                        w-16
                        h-16
                        rounded-2xl
                        ${card.bg}
                        flex
                        items-center
                        justify-center
                        mb-6
                      `}
                    >
                      <Icon
                        className={card.text}
                        size={30}
                      />
                    </div>

                    {/* TITLE */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                      Total {card.label}
                    </p>

                    {/* VALUE */}
                    <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mt-2">
                      {card.value}
                    </h2>

                    {/* BUTTON */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-indigo-500 dark:text-indigo-400 font-medium">
                        View Details
                      </span>

                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center group-hover:translate-x-1 transition-all">
                        <ArrowRight
                          size={18}
                          className="text-indigo-600 dark:text-indigo-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BACKGROUND EFFECT */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl" />
                </div>
              );
            })}
      </div>

      {/* ================= ANALYTICS SECTION ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* PLATFORM OVERVIEW */}
        <div
          className="
            rounded-3xl
            bg-white dark:bg-slate-900
            border border-gray-200 dark:border-slate-800
            shadow-lg
            p-6
          "
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
              <Activity className="text-blue-600 dark:text-blue-300" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Platform Overview
              </h3>

              <p className="text-gray-500 dark:text-gray-400">
                Quick insights about the application
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <p className="font-semibold text-gray-900 dark:text-white">
                User Ratings
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Users rate stores based on shopping
                experience and service quality.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <p className="font-semibold text-gray-900 dark:text-white">
                Store Owners
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Owners can monitor ratings and improve
                customer satisfaction.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <p className="font-semibold text-gray-900 dark:text-white">
                Platform Growth
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Track engagement, reviews, and overall
                platform activity.
              </p>
            </div>
          </div>
        </div>

        {/* ADMIN TOOLS */}
        <div
          className="
            rounded-3xl
            bg-white dark:bg-slate-900
            border border-gray-200 dark:border-slate-800
            shadow-lg
            p-6
          "
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
              <Database className="text-purple-600 dark:text-purple-300" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Capabilities
              </h3>

              <p className="text-gray-500 dark:text-gray-400">
                Powerful management tools
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                <Users
                  size={18}
                  className="text-indigo-600 dark:text-indigo-300"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Manage Users
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create, update, and manage platform users.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
                <Store
                  size={18}
                  className="text-pink-600 dark:text-pink-300"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Store Management
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Assign stores to owners and monitor
                  activity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
                <TrendingUp
                  size={18}
                  className="text-yellow-600 dark:text-yellow-300"
                />
              </div>

              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Ratings Analytics
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Analyze customer feedback and store
                  performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}