// import { useEffect, useState } from "react";
// import axios from "../../services/api";
// import EmptyState from "../../components/EmptyState";

// export default function AdminRatings() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/admin/ratings")
//       .then((res) => setData(res.data))
//       .finally(() => setLoading(false));
//   }, []);

//   if (!loading && data.length === 0) {
//     return (
//       <EmptyState
//         title="No ratings available"
//         subtitle="Users have not rated any store yet"
//       />
//     );
//   }

//   return (
//     <div className="p-6 animate-fadein">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Store Ratings & Analytics
//       </h2>

//       <div className="grid-layout">
//         {data.map((store) => (
//           <div key={store._id} className="card">
//             <h3 className="font-semibold text-lg">
//               {store.name}
//             </h3>

//             <p className="text-sm text-gray-500">
//               {store.address}
//             </p>

//             <div className="mt-3 space-y-1 text-sm">
//               <p>⭐ Avg Rating: <b>{store.avgRating.toFixed(1)}</b></p>
//               <p>🧾 Total Ratings: <b>{store.totalRatings}</b></p>
//             </div>

//             {/* SIMPLE ANALYTICS */}
//             <div className="mt-4 space-y-1 text-xs text-gray-400">
//               <p>⭐ 5 Stars: {store.breakdown[5] || 0}</p>
//               <p>⭐ 4 Stars: {store.breakdown[4] || 0}</p>
//               <p>⭐ 3 Stars: {store.breakdown[3] || 0}</p>
//               <p>⭐ 2 Stars: {store.breakdown[2] || 0}</p>
//               <p>⭐ 1 Star : {store.breakdown[1] || 0}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import axios from "../../services/api";
import EmptyState from "../../components/EmptyState";

import {
  Star,
  TrendingUp,
  Store,
  BarChart3,
  MapPin,
  Award,
} from "lucide-react";

export default function AdminRatings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= LOAD DATA =================
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(
          "/admin/ratings"
        );

        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  // ================= OVERALL STATS =================
  const stats = useMemo(() => {
    let totalStores = data.length;
    let totalRatings = 0;
    let avg = 0;

    data.forEach((store) => {
      totalRatings += store.totalRatings || 0;
      avg += store.avgRating || 0;
    });

    return {
      totalStores,
      totalRatings,
      avgRating:
        totalStores > 0
          ? (avg / totalStores).toFixed(1)
          : 0,
    };
  }, [data]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#020817] flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700 dark:text-white">
          Loading Analytics...
        </div>
      </div>
    );
  }

  // ================= EMPTY =================
  if (!loading && data.length === 0) {
    return (
      <EmptyState
        title="No ratings available"
        subtitle="Users have not rated any store yet"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] p-4 md:p-8 transition-colors duration-300">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-8 md:p-12 shadow-2xl mb-10">
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <BarChart3
                size={32}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                Ratings Analytics
              </h1>

              <p className="text-white/80 mt-2 text-lg">
                Analyze store ratings and customer
                satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* GLOW EFFECT */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {/* STORES */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Stores
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {stats.totalStores}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
              <Store className="text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </div>

        {/* RATINGS */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Ratings
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {stats.totalRatings}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
              <Star className="text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
        </div>

        {/* AVG */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Platform Average
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                ⭐ {stats.avgRating}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
              <TrendingUp className="text-pink-600 dark:text-pink-300" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= STORE CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data.map((store, index) => {
          const maxStars =
            Math.max(...Object.values(store.breakdown)) ||
            1;

          return (
            <div
              key={store._id}
              className="
                overflow-hidden
                rounded-3xl
                bg-white dark:bg-slate-900
                border border-gray-200 dark:border-slate-800
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-2
              "
            >
              {/* HEADER */}
              <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold">
                        #{index + 1}
                      </div>

                      <div className="px-3 py-1 rounded-xl bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-300 text-xs font-bold">
                        Active
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {store.name}
                    </h2>

                    <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400 text-sm">
                      <MapPin size={14} />
                      {store.address}
                    </div>
                  </div>

                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold flex items-center gap-2 shadow-lg">
                    <Star size={16} fill="black" />
                    {store.avgRating.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 pt-5">
                {/* TOP STATS */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="rounded-2xl bg-gray-100 dark:bg-slate-800 p-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Avg Rating
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      ⭐{" "}
                      {store.avgRating.toFixed(1)}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-gray-100 dark:bg-slate-800 p-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Reviews
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {store.totalRatings}
                    </h3>
                  </div>
                </div>

                {/* ANALYTICS */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award
                      size={18}
                      className="text-yellow-500"
                    />

                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Rating Breakdown
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count =
                        store.breakdown?.[star] || 0;

                      const width =
                        (count / maxStars) * 100;

                      return (
                        <div
                          key={star}
                          className="flex items-center gap-3"
                        >
                          {/* STAR LABEL */}
                          <div className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {star} ⭐
                          </div>

                          {/* BAR */}
                          <div className="flex-1 h-3 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                            <div
                              className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-yellow-400
                                to-orange-500
                              "
                              style={{
                                width: `${width}%`,
                              }}
                            />
                          </div>

                          {/* VALUE */}
                          <div className="w-8 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {count}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-6 pt-5 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Customer Satisfaction
                  </div>

                  <div
                    className={`
                      px-4 py-2 rounded-xl text-sm font-bold
                      ${
                        store.avgRating >= 4
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                          : store.avgRating >= 3
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                      }
                    `}
                  >
                    {store.avgRating >= 4
                      ? "Excellent"
                      : store.avgRating >= 3
                      ? "Average"
                      : "Poor"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}