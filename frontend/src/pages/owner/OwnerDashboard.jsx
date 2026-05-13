// import { useEffect, useMemo, useState } from "react";
// import axios from "../../services/api";
// import EmptyState from "../../components/EmptyState";
// import RatingChart from "../../components/RatingChart";
// import {
//   Store,
//   Star,
//   Users,
//   Mail,
//   Eye,
//   X,
//   MapPin,
//   TrendingUp,
// } from "lucide-react";
// import { motion } from "framer-motion";

// const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

// export default function OwnerDashboard() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [previewImage, setPreviewImage] = useState(null);

//   // ================= IMAGE URL FIX =================
//   const getImageUrl = (image) => {
//     if (!image) return "";

//     return image.startsWith("http")
//       ? image
//       : `${BACKEND_URL}${image}`;
//   };

//   useEffect(() => {
//     axios
//       .get("/owner/dashboard")
//       .then((res) => {
//         setData(Array.isArray(res.data) ? res.data : []);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // ================= STATS =================
//   const stats = useMemo(() => {
//     const totalStores = data.length;

//     let totalRatings = 0;
//     let avg = 0;

//     data.forEach((item) => {
//       totalRatings += item.ratings?.length || 0;
//       avg += item.store?.avgRating || 0;
//     });

//     return {
//       totalStores,
//       totalRatings,
//       avgRating:
//         totalStores > 0
//           ? (avg / totalStores).toFixed(1)
//           : 0,
//     };
//   }, [data]);

//   // ================= EMPTY STATE =================
//   if (!loading && data.length === 0) {
//     return (
//       <EmptyState
//         title="No stores assigned"
//         subtitle="Ask admin to assign stores to you"
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#020817] transition-colors duration-300 p-4 sm:p-6">
//       {/* ================= HERO ================= */}
//       <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 shadow-2xl mb-10">
//         <div className="relative z-10">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white">
//             Owner Dashboard
//           </h1>

//           <p className="mt-3 text-white/80 text-lg max-w-2xl">
//             Monitor your stores, ratings, and customer
//             feedback in one place.
//           </p>
//         </div>

//         <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         {/* TOTAL STORES */}
//         <motion.div
//           whileHover={{ y: -5 }}
//           className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-lg"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 Total Stores
//               </p>

//               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
//                 {stats.totalStores}
//               </h2>
//             </div>

//             <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
//               <Store className="text-indigo-600 dark:text-indigo-300" />
//             </div>
//           </div>
//         </motion.div>

//         {/* TOTAL RATINGS */}
//         <motion.div
//           whileHover={{ y: -5 }}
//           className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-lg"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 Total Ratings
//               </p>

//               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
//                 {stats.totalRatings}
//               </h2>
//             </div>

//             <div className="w-14 h-14 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
//               <Users className="text-yellow-600 dark:text-yellow-300" />
//             </div>
//           </div>
//         </motion.div>

//         {/* AVG RATING */}
//         <motion.div
//           whileHover={{ y: -5 }}
//           className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-200 dark:border-slate-800 shadow-lg"
//         >
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 Average Rating
//               </p>

//               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
//                 ⭐ {stats.avgRating}
//               </h2>
//             </div>

//             <div className="w-14 h-14 rounded-2xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
//               <TrendingUp className="text-pink-600 dark:text-pink-300" />
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* ================= STORES ================= */}
//       <div className="space-y-10">
//         {data.map(({ store, ratings }, index) => {
//           if (!store) return null;

//           return (
//             <motion.div
//               key={store._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="
//                 bg-white dark:bg-slate-900
//                 border border-gray-200 dark:border-slate-800
//                 rounded-3xl
//                 shadow-xl
//                 overflow-hidden
//               "
//             >
//               {/* ================= STORE HEADER ================= */}
//               <div className="grid grid-cols-1 lg:grid-cols-3">
//                 {/* IMAGE */}
//                 <div className="relative h-72 lg:h-full overflow-hidden">
//                   {store.image ? (
//                     <img
//                       src={getImageUrl(store.image)}
//                       alt={store.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-500">
//                       No Image
//                     </div>
//                   )}

//                   {/* OVERLAY */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                   {/* RATING BADGE */}
//                   <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold shadow-lg flex items-center gap-2">
//                     <Star size={16} fill="black" />
//                     {store.avgRating?.toFixed(1) || 0}
//                   </div>
//                 </div>

//                 {/* STORE INFO */}
//                 <div className="lg:col-span-2 p-6 lg:p-8">
//                   <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
//                     {/* LEFT */}
//                     <div>
//                       <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//                         {store.name}
//                       </h2>

//                       <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-400">
//                         <MapPin size={18} />
//                         {store.address}
//                       </div>

//                       {/* TAGS */}
//                       <div className="flex flex-wrap gap-3 mt-5">
//                         <span className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
//                           Fashion Store
//                         </span>

//                         <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-medium">
//                           Active
//                         </span>
//                       </div>

//                       {/* STATS */}
//                       <div className="flex flex-wrap gap-6 mt-6">
//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-sm">
//                             Ratings
//                           </p>

//                           <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                             {ratings?.length || 0}
//                           </h3>
//                         </div>

//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-sm">
//                             Average
//                           </p>

//                           <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                             ⭐{" "}
//                             {store.avgRating?.toFixed(1) ||
//                               0}
//                           </h3>
//                         </div>
//                       </div>
//                     </div>

//                     {/* BUTTON */}
//                     <div>
//                       {store.image ? (
//                         <button
//                           onClick={() =>
//                             setPreviewImage(
//                               getImageUrl(store.image)
//                             )
//                           }
//                           className="
//                             flex items-center gap-2
//                             px-5 py-3
//                             rounded-2xl
//                             bg-gradient-to-r
//                             from-indigo-500
//                             to-purple-500
//                             hover:from-indigo-400
//                             hover:to-purple-400
//                             text-white
//                             font-semibold
//                             transition-all
//                             duration-300
//                           "
//                         >
//                           <Eye size={18} />
//                           Preview Image
//                         </button>
//                       ) : (
//                         <p className="text-sm text-gray-400">
//                           No image uploaded
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* ================= CHART ================= */}
//                   <div className="mt-8 bg-gray-50 dark:bg-slate-800 rounded-3xl p-5">
//                     <RatingChart ratings={ratings} />
//                   </div>
//                 </div>
//               </div>

//               {/* ================= RATINGS ================= */}
//               <div className="p-6 border-t border-gray-200 dark:border-slate-800">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     Customer Ratings
//                   </h3>

//                   <div className="px-4 py-2 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 text-sm font-medium">
//                     {ratings?.length || 0} Reviews
//                   </div>
//                 </div>

//                 {!ratings || ratings.length === 0 ? (
//                   <EmptyState
//                     title="No ratings yet"
//                     subtitle="Users haven’t rated this store yet"
//                   />
//                 ) : (
//                   <>
//                     {/* MOBILE VIEW */}
//                     <div className="space-y-4 lg:hidden">
//                       {ratings.map((r) => (
//                         <div
//                           key={r._id}
//                           className="
//                             bg-gray-50 dark:bg-slate-800
//                             rounded-2xl
//                             p-4
//                             flex items-center justify-between
//                           "
//                         >
//                           <div>
//                             <p className="font-semibold text-gray-900 dark:text-white">
//                               {r.user?.name || "User"}
//                             </p>

//                             <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
//                               <Mail size={14} />
//                               {r.user?.email || "-"}
//                             </div>
//                           </div>

//                           <div className="px-3 py-2 rounded-xl bg-yellow-400 text-black font-bold">
//                             ⭐ {r.rating}
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* DESKTOP VIEW */}
//                     <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 dark:border-slate-700">
//                       <table className="w-full">
//                         <thead className="bg-gray-100 dark:bg-slate-800">
//                           <tr>
//                             <th className="p-4 text-left text-gray-700 dark:text-gray-300">
//                               User
//                             </th>

//                             <th className="p-4 text-left text-gray-700 dark:text-gray-300">
//                               Email
//                             </th>

//                             <th className="p-4 text-left text-gray-700 dark:text-gray-300">
//                               Rating
//                             </th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {ratings.map((r, i) => (
//                             <tr
//                               key={r._id}
//                               className={`
//                                 border-t
//                                 border-gray-200
//                                 dark:border-slate-700
//                                 ${
//                                   i % 2 === 0
//                                     ? "bg-white dark:bg-slate-900"
//                                     : "bg-gray-50 dark:bg-slate-800/50"
//                                 }
//                               `}
//                             >
//                               <td className="p-4 text-gray-900 dark:text-white font-medium">
//                                 {r.user?.name || "User"}
//                               </td>

//                               <td className="p-4 text-gray-600 dark:text-gray-400">
//                                 {r.user?.email || "-"}
//                               </td>

//                               <td className="p-4">
//                                 <span className="px-3 py-2 rounded-xl bg-yellow-400 text-black font-bold">
//                                   ⭐ {r.rating}
//                                 </span>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* ================= IMAGE MODAL ================= */}
//       {previewImage && (
//         <div
//           className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={() => setPreviewImage(null)}
//         >
//           <div className="relative max-w-6xl w-full">
//             {/* CLOSE BUTTON */}
//             <button
//               onClick={() => setPreviewImage(null)}
//               className="
//                 absolute
//                 top-4
//                 right-4
//                 z-10
//                 w-12
//                 h-12
//                 rounded-full
//                 bg-white/20
//                 backdrop-blur-md
//                 flex
//                 items-center
//                 justify-center
//                 text-white
//                 hover:bg-white/30
//                 transition-all
//               "
//             >
//               <X size={24} />
//             </button>

//             {/* PREVIEW IMAGE */}
//             <img
//               src={previewImage}
//               alt="Store Preview"
//               className="
//                 w-full
//                 max-h-[90vh]
//                 object-contain
//                 rounded-3xl
//                 shadow-2xl
//                 bg-black
//               "
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import axios from "../../services/api";
import EmptyState from "../../components/EmptyState";
import RatingChart from "../../components/RatingChart";
import {
  Store,
  Star,
  Users,
  Eye,
  X,
  MapPin,
  TrendingUp,
  MessageSquare,
  Mail,
  CalendarDays,
} from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export default function OwnerDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [previewImage, setPreviewImage] = useState(null);

  // REVIEW MODAL
  const [reviewModal, setReviewModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // ================= IMAGE URL =================
  const getImageUrl = (image) => {
    if (!image) return "";

    return image.startsWith("http")
      ? image
      : `${BACKEND_URL}${image}`;
  };

  // ================= LOAD DATA =================
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
    let totalReviews = 0;
    let avg = 0;

    data.forEach((item) => {
      totalRatings += item.ratings?.length || 0;

      totalReviews +=
        item.ratings?.filter(
          (r) => r.review && r.review.trim() !== ""
        ).length || 0;

      avg += item.store?.avgRating || 0;
    });

    return {
      totalStores,
      totalRatings,
      totalReviews,
      avgRating:
        totalStores > 0
          ? (avg / totalStores).toFixed(1)
          : 0,
    };
  }, [data]);

  // ================= EMPTY =================
  if (!loading && data.length === 0) {
    return (
      <EmptyState
        title="No stores assigned"
        subtitle="Ask admin to assign stores to you"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] p-4 sm:p-6">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-10 shadow-2xl mb-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Owner Dashboard
          </h1>

          <p className="mt-3 text-white/80 text-lg max-w-2xl">
            Monitor ratings, reviews, customer feedback,
            and store performance.
          </p>
        </div>

        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* STORES */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-gray-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Stores
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                {stats.totalStores}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
              <Store className="text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </motion.div>

        {/* RATINGS */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-gray-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Ratings
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                {stats.totalRatings}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
              <Users className="text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
        </motion.div>

        {/* REVIEWS */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-gray-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Reviews
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
                {stats.totalReviews}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <MessageSquare className="text-green-600 dark:text-green-300" />
            </div>
          </div>
        </motion.div>

        {/* AVG */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-gray-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Avg Rating
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
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
      <div className="space-y-6">
        {data.map(({ store, ratings }, index) => {
          if (!store) return null;

          const totalReviews = ratings.filter(
            (r) => r.review && r.review.trim() !== ""
          ).length;

          return (
            <motion.div
              key={store._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-800"
            >
              {/* ================= TOP SECTION ================= */}
              <div className="grid grid-cols-1 lg:grid-cols-4">
                {/* IMAGE */}
                <div className="relative h-56 lg:h-full overflow-hidden">
                  {store.image ? (
                    <img
                      src={getImageUrl(store.image)}
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold flex items-center gap-2 shadow-lg">
                    <Star size={16} fill="black" />
                    {store.avgRating?.toFixed(1) || 0}
                  </div>
                </div>

                {/* STORE INFO */}
                <div className="lg:col-span-3 p-5 lg:p-6">
                  <div className="flex flex-col xl:flex-row xl:justify-between gap-6">
                    {/* LEFT */}
                    <div className="flex-1">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        {store.name}
                      </h2>

                      <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-400">
                        <MapPin size={17} />
                        <span className="text-sm">
                          {store.address}
                        </span>
                      </div>

                      {/* STORE STATS */}
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Ratings
                          </p>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                            {ratings.length}
                          </h3>
                        </div>

                        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Reviews
                          </p>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                            {totalReviews}
                          </h3>
                        </div>

                        <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Average
                          </p>

                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                            ⭐{" "}
                            {store.avgRating?.toFixed(1) ||
                              0}
                          </h3>
                        </div>
                      </div>

                      {/* CHART */}
                      <div className="mt-6 bg-gray-50 dark:bg-slate-800 rounded-3xl p-4">
                        <RatingChart ratings={ratings} />
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex xl:flex-col gap-3">
                      {store.image && (
                        <button
                          onClick={() =>
                            setPreviewImage(
                              getImageUrl(store.image)
                            )
                          }
                          className="
                            px-4 py-3 rounded-2xl
                            bg-gradient-to-r
                            from-indigo-500 to-purple-500
                            text-white font-semibold
                            flex items-center justify-center gap-2
                            hover:scale-105 transition
                          "
                        >
                          <Eye size={18} />
                          Preview
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedStore({
                            ...store,
                            ratings,
                          });

                          setReviewModal(true);
                        }}
                        className="
                          px-4 py-3 rounded-2xl
                          bg-gradient-to-r
                          from-green-500 to-emerald-500
                          text-white font-semibold
                          flex items-center justify-center gap-2
                          hover:scale-105 transition
                        "
                      >
                        <MessageSquare size={18} />
                        Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= RECENT REVIEWS ================= */}
              <div className="p-5 border-t border-gray-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Reviews
                  </h3>

                  <div className="px-4 py-2 rounded-2xl bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 text-sm font-medium">
                    {totalReviews} Reviews
                  </div>
                </div>

                {ratings.filter((r) => r.review).length ===
                0 ? (
                  <EmptyState
                    title="No reviews yet"
                    subtitle="Users haven’t written reviews"
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {ratings
                      .filter(
                        (r) =>
                          r.review &&
                          r.review.trim() !== ""
                      )
                      .slice(0, 2)
                      .map((r) => (
                        <div
                          key={r._id}
                          className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 border border-gray-200 dark:border-slate-700"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {r.user?.name || "User"}
                              </h4>

                              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                <Mail size={14} />
                                {r.user?.email}
                              </div>

                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                                <CalendarDays size={13} />
                                {new Date(
                                  r.createdAt
                                ).toLocaleDateString()}
                              </div>
                            </div>

                            <div className="px-3 py-2 rounded-xl bg-yellow-400 text-black font-bold">
                              ⭐ {r.rating}
                            </div>
                          </div>

                          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                            "{r.review}"
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= IMAGE MODAL ================= */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <X size={24} />
            </button>

            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[90vh] object-contain rounded-3xl"
            />
          </div>
        </div>
      )}

      {/* ================= REVIEW MODAL ================= */}
      {reviewModal && selectedStore && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 border border-gray-200 dark:border-slate-700">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedStore.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  All customer reviews
                </p>
              </div>

              <button
                onClick={() => setReviewModal(false)}
                className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                <X size={22} />
              </button>
            </div>

            {/* REVIEWS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {selectedStore.ratings
                .filter(
                  (r) =>
                    r.review && r.review.trim() !== ""
                )
                .map((r) => (
                  <div
                    key={r._id}
                    className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-5 border border-gray-200 dark:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                          {r.user?.name || "User"}
                        </h4>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {r.user?.email}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                          <CalendarDays size={13} />
                          {new Date(
                            r.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-bold">
                        ⭐ {r.rating}
                      </div>
                    </div>

                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {r.review}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}