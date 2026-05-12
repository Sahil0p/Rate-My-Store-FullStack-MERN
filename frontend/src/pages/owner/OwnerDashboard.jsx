// import { useEffect, useState } from "react";
// import axios from "../../services/api";
// import EmptyState from "../../components/EmptyState";
// import RatingChart from "../../components/RatingChart";

// export default function OwnerDashboard() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/owner/dashboard")
//       .then((res) => {
//         // ✅ Ensure array
//         setData(Array.isArray(res.data) ? res.data : []);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (!loading && data.length === 0) {
//     return (
//       <EmptyState
//         title="No stores assigned"
//         subtitle="Ask admin to assign stores to you"
//       />
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6">
//       <h2 className="text-2xl font-bold mb-8 text-center">
//         My Stores
//       </h2>

//       {data.map(({ store, ratings }) => {
//         if (!store) return null;

//         return (
//           <div key={store._id} className="mb-12">
//             {/* ================= STORE CARD ================= */}
//             <div className="card mb-4">
//               <h3 className="text-lg sm:text-xl font-semibold">
//                 {store.name}
//               </h3>

//               <p className="text-gray-600 dark:text-gray-400">
//                 {store.address}
//               </p>

//               <p className="mt-2 font-medium">
//                 Avg ⭐ {store.avgRating?.toFixed(1) || 0}
//               </p>

//               {/* ✅ COLLAPSIBLE IMAGE */}
//               {store.image ? (
//                 <details className="mt-4 group">
//                   <summary className="cursor-pointer text-sm text-blue-500 hover:underline">
//                     View store image
//                   </summary>

//                   <img
//                     src={store.image}
//                     alt={store.name}
//                     className="mt-3 w-full max-h-64 object-cover rounded-lg transition-all duration-300"
//                   />
//                 </details>
//               ) : (
//                 <p className="text-sm text-gray-400 mt-3">
//                   No store image uploaded
//                 </p>
//               )}
//             </div>

//             {/* ================= RATINGS ================= */}
//             {!ratings || ratings.length === 0 ? (
//               <EmptyState
//                 title="No ratings yet"
//                 subtitle="Users haven’t rated this store yet"
//               />
//             ) : (
//               <>
//                 {/* 📱 MOBILE VIEW */}
//                 <div className="space-y-3 sm:hidden mb-6">
//                   {ratings.map((r) => (
//                     <div
//                       key={r._id}
//                       className="card flex justify-between items-center"
//                     >
//                       <div>
//                         <p className="font-medium">
//                           {r.user?.name || "User"}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           {r.user?.email || "-"}
//                         </p>
//                       </div>
//                       <div className="font-semibold">
//                         ⭐ {r.rating}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* 🖥 DESKTOP VIEW */}
//                 <div className="hidden sm:block card p-0 mb-6 overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-100 dark:bg-gray-700">
//                       <tr>
//                         <th className="p-3 text-left">User</th>
//                         <th className="p-3 text-left">Email</th>
//                         <th className="p-3 text-left">Rating</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {ratings.map((r) => (
//                         <tr key={r._id} className="border-t">
//                           <td className="p-3">
//                             {r.user?.name || "User"}
//                           </td>
//                           <td className="p-3">
//                             {r.user?.email || "-"}
//                           </td>
//                           <td className="p-3">
//                             ⭐ {r.rating}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* 📊 CHART */}
//                 <div className="card">
//                   <RatingChart ratings={ratings} />
//                 </div>
//               </>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "../../services/api";
import EmptyState from "../../components/EmptyState";
import RatingChart from "../../components/RatingChart";

export default function OwnerDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios
      .get("/owner/dashboard")
      .then((res) => {
        setData(Array.isArray(res.data) ? res.data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && data.length === 0) {
    return (
      <EmptyState
        title="No stores assigned"
        subtitle="Ask admin to assign stores to you"
      />
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">
        My Stores
      </h2>

      {data.map(({ store, ratings }) => {
        if (!store) return null;

        return (
          <div key={store._id} className="mb-12">
            {/* ================= STORE CARD ================= */}
            <div className="card mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                {store.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-400">
                {store.address}
              </p>

              <p className="mt-2 font-medium">
                Avg ⭐ {store.avgRating?.toFixed(1) || 0}
              </p>

              {/* IMAGE PREVIEW BUTTON */}
              {store.image ? (
                <button
                  onClick={() => setPreviewImage(store.image)}
                  className="mt-4 text-sm text-blue-500 hover:underline"
                >
                  View store image
                </button>
              ) : (
                <p className="text-sm text-gray-400 mt-3">
                  No store image uploaded
                </p>
              )}
            </div>

            {/* ================= RATINGS ================= */}
            {!ratings || ratings.length === 0 ? (
              <EmptyState
                title="No ratings yet"
                subtitle="Users haven’t rated this store yet"
              />
            ) : (
              <>
                {/* 📱 MOBILE VIEW */}
                <div className="space-y-3 sm:hidden mb-6">
                  {ratings.map((r) => (
                    <div
                      key={r._id}
                      className="card flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          {r.user?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {r.user?.email || "-"}
                        </p>
                      </div>
                      <div className="font-semibold">
                        ⭐ {r.rating}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 🖥 DESKTOP VIEW */}
                <div className="hidden sm:block card p-0 mb-6 overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="p-3 text-left">User</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ratings.map((r) => (
                        <tr key={r._id} className="border-t">
                          <td className="p-3">
                            {r.user?.name || "User"}
                          </td>
                          <td className="p-3">
                            {r.user?.email || "-"}
                          </td>
                          <td className="p-3">
                            ⭐ {r.rating}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 📊 CHART */}
                <div className="card">
                  <RatingChart ratings={ratings} />
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* ================= FULL SCREEN IMAGE MODAL ================= */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full px-4">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>

            <img
              src={previewImage}
              alt="Store"
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
