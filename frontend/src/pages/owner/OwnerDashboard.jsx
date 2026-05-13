import { useEffect, useMemo, useState } from "react";
import axios from "../../services/api";
import EmptyState from "../../components/EmptyState";
import RatingChart from "../../components/RatingChart";
import {
  Store,
  Star,
  Users,
  Mail,
  Eye,
  X,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export default function OwnerDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  // ================= IMAGE URL FIX =================
  const getImageUrl = (image) => {
    if (!image) return "";

    return image.startsWith("http")
      ? image
      : `${BACKEND_URL}${image}`;
  };

  useEffect(() => {
    axios
      .get("/owner/dashboard")
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  // ================= STATS =================
  const stats = useMemo(() => {
    const totalStores = data.length;

    let totalRatings = 0;
    let avg = 0;

    data.forEach((item) => {
      totalRatings += item.ratings?.length || 0;
      avg += item.store?.avgRating || 0;
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

  // ================= EMPTY STATE =================
  if (!loading && data.length === 0) {
    return (
      <EmptyState
        title="No stores assigned"
        subtitle="Ask admin to assign stores to you"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] transition-colors duration-300 p-4 sm:p-6">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 shadow-2xl mb-10">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Owner Dashboard
          </h1>

          <p className="mt-3 text-white/80 text-lg max-w-2xl">
            Monitor your stores, ratings, and customer
            feedback in one place.
          </p>
        </div>

        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* TOTAL STORES */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Stores
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalStores}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
              <Store className="text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </motion.div>

        {/* TOTAL RATINGS */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Ratings
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalRatings}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
              <Users className="text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
        </motion.div>

        {/* AVG RATING */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Average Rating
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ⭐ {stats.avgRating}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
              <TrendingUp className="text-pink-600 dark:text-pink-300" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= STORES ================= */}
      <div className="space-y-10">
        {data.map(({ store, ratings }, index) => {
          if (!store) return null;

          return (
            <motion.div
              key={store._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="
                bg-white dark:bg-slate-900
                border border-gray-200 dark:border-slate-800
                rounded-3xl
                shadow-xl
                overflow-hidden
              "
            >
              {/* ================= STORE HEADER ================= */}
              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* IMAGE */}
                <div className="relative h-72 lg:h-full overflow-hidden">
                  {store.image ? (
                    <img
                      src={getImageUrl(store.image)}
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* RATING BADGE */}
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold shadow-lg flex items-center gap-2">
                    <Star size={16} fill="black" />
                    {store.avgRating?.toFixed(1) || 0}
                  </div>
                </div>

                {/* STORE INFO */}
                <div className="lg:col-span-2 p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* LEFT */}
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {store.name}
                      </h2>

                      <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-400">
                        <MapPin size={18} />
                        {store.address}
                      </div>

                      {/* TAGS */}
                      <div className="flex flex-wrap gap-3 mt-5">
                        <span className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                          Fashion Store
                        </span>

                        <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-medium">
                          Active
                        </span>
                      </div>

                      {/* STATS */}
                      <div className="flex flex-wrap gap-6 mt-6">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Ratings
                          </p>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {ratings?.length || 0}
                          </h3>
                        </div>

                        <div>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Average
                          </p>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            ⭐{" "}
                            {store.avgRating?.toFixed(1) ||
                              0}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <div>
                      {store.image ? (
                        <button
                          onClick={() =>
                            setPreviewImage(
                              getImageUrl(store.image)
                            )
                          }
                          className="
                            flex items-center gap-2
                            px-5 py-3
                            rounded-2xl
                            bg-gradient-to-r
                            from-indigo-500
                            to-purple-500
                            hover:from-indigo-400
                            hover:to-purple-400
                            text-white
                            font-semibold
                            transition-all
                            duration-300
                          "
                        >
                          <Eye size={18} />
                          Preview Image
                        </button>
                      ) : (
                        <p className="text-sm text-gray-400">
                          No image uploaded
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ================= CHART ================= */}
                  <div className="mt-8 bg-gray-50 dark:bg-slate-800 rounded-3xl p-5">
                    <RatingChart ratings={ratings} />
                  </div>
                </div>
              </div>

              {/* ================= RATINGS ================= */}
              <div className="p-6 border-t border-gray-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Customer Ratings
                  </h3>

                  <div className="px-4 py-2 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 text-sm font-medium">
                    {ratings?.length || 0} Reviews
                  </div>
                </div>

                {!ratings || ratings.length === 0 ? (
                  <EmptyState
                    title="No ratings yet"
                    subtitle="Users haven’t rated this store yet"
                  />
                ) : (
                  <>
                    {/* MOBILE VIEW */}
                    <div className="space-y-4 lg:hidden">
                      {ratings.map((r) => (
                        <div
                          key={r._id}
                          className="
                            bg-gray-50 dark:bg-slate-800
                            rounded-2xl
                            p-4
                            flex items-center justify-between
                          "
                        >
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {r.user?.name || "User"}
                            </p>

                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <Mail size={14} />
                              {r.user?.email || "-"}
                            </div>
                          </div>

                          <div className="px-3 py-2 rounded-xl bg-yellow-400 text-black font-bold">
                            ⭐ {r.rating}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-700">
                      <table className="w-full">
                        <thead className="bg-gray-100 dark:bg-slate-800">
                          <tr>
                            <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                              User
                            </th>

                            <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                              Email
                            </th>

                            <th className="p-4 text-left text-gray-700 dark:text-gray-300">
                              Rating
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {ratings.map((r, i) => (
                            <tr
                              key={r._id}
                              className={`
                                border-t
                                border-gray-200
                                dark:border-slate-700
                                ${
                                  i % 2 === 0
                                    ? "bg-white dark:bg-slate-900"
                                    : "bg-gray-50 dark:bg-slate-800/50"
                                }
                              `}
                            >
                              <td className="p-4 text-gray-900 dark:text-white font-medium">
                                {r.user?.name || "User"}
                              </td>

                              <td className="p-4 text-gray-600 dark:text-gray-400">
                                {r.user?.email || "-"}
                              </td>

                              <td className="p-4">
                                <span className="px-3 py-2 rounded-xl bg-yellow-400 text-black font-bold">
                                  ⭐ {r.rating}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= IMAGE MODAL ================= */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setPreviewImage(null)}
              className="
                absolute
                top-4
                right-4
                z-10
                w-12
                h-12
                rounded-full
                bg-white/20
                backdrop-blur-md
                flex
                items-center
                justify-center
                text-white
                hover:bg-white/30
                transition-all
              "
            >
              <X size={24} />
            </button>

            {/* PREVIEW IMAGE */}
            <img
              src={previewImage}
              alt="Store Preview"
              className="
                w-full
                max-h-[90vh]
                object-contain
                rounded-3xl
                shadow-2xl
                bg-black
              "
            />
          </div>
        </div>
      )}
    </div>
  );
}