// import { useEffect, useState } from "react";
// import axios from "../../services/api";
// import RatingStars from "../../components/RatingStars";
// import EmptyState from "../../components/EmptyState";
// import SkeletonCard from "../../components/SkeletonCard";

// export default function UserStores() {
//   const [stores, setStores] = useState([]);
//   const [myRatings, setMyRatings] = useState({});
//   const [loading, setLoading] = useState(true);

//   const loadData = async () => {
//     try {
//       const { data } = await axios.get("/user/stores");

//       const ratingMap = {};
//       for (const store of data) {
//         const res = await axios.get(`/user/rating/${store._id}`);
//         if (res.data) {
//           ratingMap[store._id] = res.data.rating;
//         }
//       }

//       setStores(data);
//       setMyRatings(ratingMap);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const rate = async (storeId, value) => {
//     await axios.post(`/user/rating/${storeId}`, { rating: value });
//     loadData();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">
//         Available Stores
//       </h2>

//       {loading ? (
//         <div className="grid-layout">
//           {[...Array(6)].map((_, i) => (
//             <SkeletonCard key={i} />
//           ))}
//         </div>
//       ) : stores.length === 0 ? (
//         <EmptyState
//           title="No stores available"
//           subtitle="Please check back later"
//         />
//       ) : (
//         <div className="grid-layout">
//           {stores.map((store) => (
//             <div
//               key={store._id}
//               className="card flex flex-col sm:flex-row gap-4 items-start sm:items-center"
//             >
//               {/* LEFT — Store Info */}
//               <div className="flex-1">
//                 <h3 className="font-semibold text-lg">
//                   {store.name}
//                 </h3>

//                 <p className="text-gray-600 dark:text-gray-400">
//                   {store.address}
//                 </p>

//                 <p className="mt-1 font-medium">
//                   Avg ⭐ {store.avgRating?.toFixed(1) || 0}
//                 </p>

//                 <div className="mt-3">
//                   <RatingStars
//                     value={myRatings[store._id] || 0}
//                     onChange={(v) => rate(store._id, v)}
//                   />

//                   {myRatings[store._id] && (
//                     <p className="text-sm mt-1 text-blue-500">
//                       Your rating: {myRatings[store._id]} ⭐
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* RIGHT — Store Image */}
//               {store.image ? (
//                 <img
//                   src={store.image}
//                   alt={store.name}
//                   className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg"
//                 />
//               ) : (
//                 <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-500">
//                   No Image
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "../../services/api";
import RatingStars from "../../components/RatingStars";
import EmptyState from "../../components/EmptyState";
import SkeletonCard from "../../components/SkeletonCard";

const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [myRatings, setMyRatings] = useState({});
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const { data } = await axios.get("/user/stores");

      const ratingMap = {};
      for (const store of data) {
        const res = await axios.get(`/user/rating/${store._id}`);
        if (res.data) {
          ratingMap[store._id] = res.data.rating;
        }
      }

      setStores(Array.isArray(data) ? data : []);
      setMyRatings(ratingMap);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const rate = async (storeId, value) => {
    await axios.post(`/user/rating/${storeId}`, { rating: value });
    loadData();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Available Stores
      </h2>

      {loading ? (
        <div className="grid-layout">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : stores.length === 0 ? (
        <EmptyState
          title="No stores available"
          subtitle="Please check back later"
        />
      ) : (
        <div className="grid-layout">
          {stores.map((store) => (
            <div
              key={store._id}
              className="card flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              {/* LEFT — INFO */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {store.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400">
                  {store.address}
                </p>

                <p className="mt-1 font-medium">
                  Avg ⭐ {store.avgRating?.toFixed(1) || 0}
                </p>

                <div className="mt-3">
                  <RatingStars
                    value={myRatings[store._id] || 0}
                    onChange={(v) => rate(store._id, v)}
                  />

                  {myRatings[store._id] && (
                    <p className="text-sm mt-1 text-blue-500">
                      Your rating: {myRatings[store._id]} ⭐
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT — IMAGE */}
              {store.image ? (
                <img
                  src={`${BACKEND_URL}${store.image}`}
                  alt={store.name}
                  className="w-full sm:w-32 h-40 sm:h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-500">
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
