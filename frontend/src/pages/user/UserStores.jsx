// import { useEffect, useMemo, useState } from "react";
// import axios from "../../services/api";
// import RatingStars from "../../components/RatingStars";
// import EmptyState from "../../components/EmptyState";
// import SkeletonCard from "../../components/SkeletonCard";
// import { Search, MapPin, Star } from "lucide-react";
// import { motion } from "framer-motion";

// const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

// export default function UserStores() {
//   const [stores, setStores] = useState([]);
//   const [myRatings, setMyRatings] = useState({});
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("top");

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get("/user/stores");

//       const ratingMap = {};

//       await Promise.all(
//         data.map(async (store) => {
//           const res = await axios.get(`/user/rating/${store._id}`);

//           if (res.data) {
//             ratingMap[store._id] = res.data.rating;
//           }
//         })
//       );

//       setStores(Array.isArray(data) ? data : []);
//       setMyRatings(ratingMap);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const rate = async (storeId, value) => {
//     try {
//       await axios.post(`/user/rating/${storeId}`, {
//         rating: value,
//       });

//       setMyRatings((prev) => ({
//         ...prev,
//         [storeId]: value,
//       }));

//       loadData();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const filteredStores = useMemo(() => {
//     let filtered = [...stores];

//     // SEARCH
//     filtered = filtered.filter((store) => {
//       const query = search.toLowerCase();

//       return (
//         store.name.toLowerCase().includes(query) ||
//         store.address.toLowerCase().includes(query)
//       );
//     });

//     // SORT
//     if (sortBy === "top") {
//       filtered.sort(
//         (a, b) => (b.avgRating || 0) - (a.avgRating || 0)
//       );
//     }

//     if (sortBy === "low") {
//       filtered.sort(
//         (a, b) => (a.avgRating || 0) - (b.avgRating || 0)
//       );
//     }

//     if (sortBy === "az") {
//       filtered.sort((a, b) =>
//         a.name.localeCompare(b.name)
//       );
//     }

//     return filtered;
//   }, [stores, search, sortBy]);

//   return (
//     <div className="min-h-screen px-4 md:px-8 py-6 bg-gray-50 dark:bg-[#020817] transition-colors duration-300">
//       {/* HERO SECTION */}
//       <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 shadow-2xl mb-10">
//         <div className="relative z-10">
//           <h1 className="text-4xl md:text-5xl font-extrabold text-white">
//             Discover Amazing Stores
//           </h1>

//           <p className="mt-3 text-white/80 text-lg max-w-2xl">
//             Explore stores, give ratings, and help others
//             discover the best shopping experiences.
//           </p>
//         </div>

//         <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
//       </div>

//       {/* SEARCH + FILTER */}
//       <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
//         {/* SEARCH */}
//         <div className="relative w-full lg:w-[400px]">
//           <Search
//             size={18}
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search stores or locations..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="
//               w-full
//               pl-11
//               pr-4
//               py-3
//               rounded-2xl
//               bg-white dark:bg-slate-800
//               border border-gray-300 dark:border-slate-700
//               text-gray-900 dark:text-white
//               outline-none
//               focus:border-indigo-500
//               transition-all
//             "
//           />
//         </div>

//         {/* FILTER */}
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="
//             px-4
//             py-3
//             rounded-2xl
//             bg-white dark:bg-slate-800
//             border border-gray-300 dark:border-slate-700
//             text-gray-900 dark:text-white
//             outline-none
//             focus:border-indigo-500
//           "
//         >
//           <option value="top">Top Rated</option>
//           <option value="low">Lowest Rated</option>
//           <option value="az">A-Z</option>
//         </select>
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       ) : filteredStores.length === 0 ? (
//         <EmptyState
//           title="No stores found"
//           subtitle="Try searching something else"
//         />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
//           {filteredStores.map((store, index) => (
//             <motion.div
//               key={store._id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{
//                 y: -6,
//                 scale: 1.02,
//               }}
//               className="
//                 group
//                 overflow-hidden
//                 rounded-3xl
//                 bg-white dark:bg-slate-900
//                 border border-gray-200 dark:border-slate-800
//                 shadow-lg
//                 hover:shadow-2xl
//                 dark:hover:shadow-indigo-500/20
//                 transition-all
//                 duration-300
//               "
//             >
//               {/* IMAGE */}
//               <div className="relative overflow-hidden">
//                 {store.image ? (
//                   <img
//                     src={`${BACKEND_URL}${store.image}`}
//                     alt={store.name}
//                     className="
//                       h-56
//                       w-full
//                       object-cover
//                       transition-transform
//                       duration-500
//                       group-hover:scale-110
//                     "
//                   />
//                 ) : (
//                   <div className="h-56 bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-500">
//                     No Image
//                   </div>
//                 )}

//                 {/* RATING BADGE */}
//                 <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-xl font-bold flex items-center gap-1 shadow-lg">
//                   <Star size={16} fill="black" />
//                   {store.avgRating?.toFixed(1) || 0}
//                 </div>
//               </div>

//               {/* CONTENT */}
//               <div className="p-5 bg-white dark:bg-slate-900">
//                 {/* TITLE */}
//                 <div className="flex justify-between items-start gap-3">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">
//                       {store.name}
//                     </h3>

//                     <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400 text-sm">
//                       <MapPin size={14} />
//                       {store.address}
//                     </div>
//                   </div>
//                 </div>

//                 {/* CATEGORY TAG */}
//                 <div className="mt-4">
//                   <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
//                     Fashion Store
//                   </span>
//                 </div>

//                 {/* STATS */}
//                 <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
//                   <span>
//                     ⭐ {store.avgRating?.toFixed(1) || 0}
//                   </span>

//                   <span>
//                     👥 {store.totalRatings || 0} Reviews
//                   </span>
//                 </div>

//                 {/* USER RATING */}
//                 <div className="mt-5">
//                   <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
//                     Rate this store
//                   </p>

//                   <RatingStars
//                     value={myRatings[store._id] || 0}
//                     onChange={(v) =>
//                       rate(store._id, v)
//                     }
//                   />

//                   {myRatings[store._id] && (
//                     <p className="text-sm mt-2 text-indigo-500 dark:text-indigo-400">
//                       Your rating:{" "}
//                       {myRatings[store._id]} ⭐
//                     </p>
//                   )}
//                 </div>

//                 {/* BUTTON */}
//                 <button
//                   className="
//                     w-full
//                     mt-6
//                     py-3
//                     rounded-2xl
//                     bg-gradient-to-r
//                     from-indigo-500
//                     to-purple-500
//                     hover:from-indigo-400
//                     hover:to-purple-400
//                     text-white
//                     font-semibold
//                     transition-all
//                     duration-300
//                   "
//                 >
//                   View Store
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// frontend/src/pages/user/UserStores.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import RatingStars from "../../components/RatingStars";
import EmptyState from "../../components/EmptyState";
import SkeletonCard from "../../components/SkeletonCard";
import { Search, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export default function UserStores() {
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [myRatings, setMyRatings] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("top");

  // ================= IMAGE URL =================
  const getImageUrl = (image) => {
    if (!image) return "";

    return image.startsWith("http")
      ? image
      : `${BACKEND_URL}${image}`;
  };

  // ================= LOAD DATA =================
  const loadData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/user/stores");

      const ratingMap = {};

      await Promise.all(
        data.map(async (store) => {
          const res = await axios.get(`/user/rating/${store._id}`);

          if (res.data) {
            ratingMap[store._id] = res.data.rating;
          }
        })
      );

      setStores(Array.isArray(data) ? data : []);
      setMyRatings(ratingMap);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= RATE STORE =================
  const rate = async (storeId, value) => {
    try {
      await axios.post(`/user/rating/${storeId}`, {
        rating: value,
      });

      setMyRatings((prev) => ({
        ...prev,
        [storeId]: value,
      }));

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= FILTER + SORT =================
  const filteredStores = useMemo(() => {
    let filtered = [...stores];

    // SEARCH
    filtered = filtered.filter((store) => {
      const query = search.toLowerCase();

      return (
        store.name.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query)
      );
    });

    // SORT
    if (sortBy === "top") {
      filtered.sort(
        (a, b) => (b.avgRating || 0) - (a.avgRating || 0)
      );
    }

    if (sortBy === "low") {
      filtered.sort(
        (a, b) => (a.avgRating || 0) - (b.avgRating || 0)
      );
    }

    if (sortBy === "az") {
      filtered.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return filtered;
  }, [stores, search, sortBy]);

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 bg-gray-50 dark:bg-[#020817] transition-colors duration-300">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 md:p-12 shadow-2xl mb-10">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Discover Amazing Stores
          </h1>

          <p className="mt-3 text-white/80 text-lg max-w-2xl">
            Explore stores, give ratings, and help others
            discover the best shopping experiences.
          </p>
        </div>

        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
        {/* SEARCH */}
        <div className="relative w-full lg:w-[400px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search stores or locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              pl-11
              pr-4
              py-3
              rounded-2xl
              bg-white dark:bg-slate-800
              border border-gray-300 dark:border-slate-700
              text-gray-900 dark:text-white
              outline-none
              focus:border-indigo-500
              transition-all
            "
          />
        </div>

        {/* FILTER */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
            px-4
            py-3
            rounded-2xl
            bg-white dark:bg-slate-800
            border border-gray-300 dark:border-slate-700
            text-gray-900 dark:text-white
            outline-none
            focus:border-indigo-500
          "
        >
          <option value="top">Top Rated</option>
          <option value="low">Lowest Rated</option>
          <option value="az">A-Z</option>
        </select>
      </div>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredStores.length === 0 ? (
        <EmptyState
          title="No stores found"
          subtitle="Try searching something else"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredStores.map((store, index) => (
            <motion.div
              key={store._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              className="
                group
                overflow-hidden
                rounded-3xl
                bg-white dark:bg-slate-900
                border border-gray-200 dark:border-slate-800
                shadow-lg
                hover:shadow-2xl
                dark:hover:shadow-indigo-500/20
                transition-all
                duration-300
              "
            >
              {/* ================= IMAGE ================= */}
              <div className="relative overflow-hidden">
                {store.image ? (
                  <img
                    src={getImageUrl(store.image)}
                    alt={store.name}
                    className="
                      h-56
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                  />
                ) : (
                  <div className="h-56 bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* RATING BADGE */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-xl font-bold flex items-center gap-1 shadow-lg">
                  <Star size={16} fill="black" />
                  {store.avgRating?.toFixed(1) || 0}
                </div>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="p-5 bg-white dark:bg-slate-900">
                {/* TITLE */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {store.name}
                    </h3>

                    <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400 text-sm">
                      <MapPin size={14} />
                      {store.address}
                    </div>
                  </div>
                </div>

                {/* TAG */}
                <div className="mt-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
                    Fashion Store
                  </span>
                </div>

                {/* STATS */}
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    ⭐ {store.avgRating?.toFixed(1) || 0}
                  </span>

                  <span>
                    👥 {store.totalRatings || 0} Reviews
                  </span>
                </div>

                {/* USER RATING */}
                <div className="mt-5">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Rate this store
                  </p>

                  <RatingStars
                    value={myRatings[store._id] || 0}
                    onChange={(v) =>
                      rate(store._id, v)
                    }
                  />

                  {myRatings[store._id] && (
                    <p className="text-sm mt-2 text-indigo-500 dark:text-indigo-400">
                      Your rating:{" "}
                      {myRatings[store._id]} ⭐
                    </p>
                  )}
                </div>

                {/* ================= BUTTON ================= */}
                <button
                  onClick={() =>
                    navigate(`/store/${store._id}`)
                  }
                  className="
                    w-full
                    mt-6
                    py-3
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
                  View Store
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}