// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../../services/api";
// import RatingStars from "../../components/RatingStars";
// import {
//   ArrowLeft,
//   MapPin,
//   Star,
// } from "lucide-react";

// const BACKEND_URL = import.meta.env.VITE_API_URL.replace(
//   "/api",
//   ""
// );

// export default function StoreDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [store, setStore] = useState(null);
//   const [myRating, setMyRating] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const getImageUrl = (image) => {
//     if (!image) return "";

//     return image.startsWith("http")
//       ? image
//       : `${BACKEND_URL}${image}`;
//   };

//   const loadStore = async () => {
//     try {
//       setLoading(true);

//       // GET STORE
//       const { data } = await axios.get(
//         `/user/store/${id}`
//       );

//       setStore(data);

//       // GET USER RATING
//       const ratingRes = await axios.get(
//         `/user/rating/${id}`
//       );

//       if (ratingRes.data) {
//         setMyRating(ratingRes.data.rating);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

// //   useEffect(() => {
// //     loadStore();
// //   }, [id]);

// useEffect(() => {
//   const fetchStore = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(
//         `/user/store/${id}`
//       );

//       setStore(data);

//       const ratingRes = await axios.get(
//         `/user/rating/${id}`
//       );

//       if (ratingRes.data) {
//         setMyRating(ratingRes.data.rating);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchStore();
// }, [id]);

//   const rateStore = async (value) => {
//     try {
//       await axios.post(`/user/rating/${id}`, {
//         rating: value,
//       });

//       setMyRating(value);

//       loadStore();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
//         Loading...
//       </div>
//     );
//   }

//   if (!store) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
//         Store not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#020817] p-4 md:p-8">
//       {/* BACK BUTTON */}
//       <button
//         onClick={() => navigate(-1)}
//         className="
//           flex items-center gap-2
//           mb-6
//           px-5 py-3
//           rounded-2xl
//           bg-white dark:bg-slate-900
//           border border-gray-200 dark:border-slate-700
//           shadow-md
//           hover:scale-105
//           transition-all
//         "
//       >
//         <ArrowLeft size={18} />
//         Back
//       </button>

//       {/* MAIN CARD */}
//       <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-800">
//         {/* IMAGE */}
//         <div className="relative h-[350px] md:h-[500px] overflow-hidden">
//           {store.image ? (
//             <img
//               src={getImageUrl(store.image)}
//               alt={store.name}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
//               No Image
//             </div>
//           )}

//           {/* OVERLAY */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

//           {/* STORE INFO */}
//           <div className="absolute bottom-8 left-8 text-white">
//             <h1 className="text-4xl md:text-5xl font-extrabold">
//               {store.name}
//             </h1>

//             <div className="flex items-center gap-2 mt-3 text-white/90">
//               <MapPin size={18} />
//               {store.address}
//             </div>

//             <div className="mt-4 flex items-center gap-3">
//               <div className="bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold flex items-center gap-2">
//                 <Star size={18} fill="black" />
//                 {store.avgRating?.toFixed(1) || 0}
//               </div>

//               <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
//                 {store.totalRatings || 0} Reviews
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="p-6 md:p-10">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Rate This Store
//           </h2>

//           <div className="mt-4">
//             <RatingStars
//               value={myRating}
//               onChange={rateStore}
//             />
//           </div>

//           {myRating > 0 && (
//             <p className="mt-3 text-indigo-500 font-medium">
//               Your Rating: {myRating} ⭐
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "../../services/api";

import RatingStars from "../../components/RatingStars";

import {
  ArrowLeft,
  MapPin,
  Star,
  Phone,
  Globe,
  Building2,
  MessageSquare,
} from "lucide-react";

const BACKEND_URL =
  import.meta.env.VITE_API_URL.replace(
    "/api",
    ""
  );

export default function StoreDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [store, setStore] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [myRating, setMyRating] =
    useState(0);

  const [reviewText, setReviewText] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  /* =========================
     IMAGE URL
  ========================= */
  const getImageUrl = (image) => {
    if (!image) return "";

    return image.startsWith("http")
      ? image
      : `${BACKEND_URL}${image}`;
  };

  /* =========================
     LOAD STORE
  ========================= */
  const loadStore = async () => {
    try {
      setLoading(true);

      // STORE
      const { data } = await axios.get(
        `/user/store/${id}`
      );

      setStore(data);

      // USER RATING
      const ratingRes =
        await axios.get(
          `/user/rating/${id}`
        );

      if (ratingRes.data) {
        setMyRating(
          ratingRes.data.rating
        );

        setReviewText(
          ratingRes.data.review || ""
        );
      }

      // REVIEWS
      const reviewsRes =
        await axios.get(
          `/user/store/${id}/reviews`
        );

      setReviews(
        Array.isArray(
          reviewsRes.data
        )
          ? reviewsRes.data
          : []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStore();
  }, [id]);

  /* =========================
     SUBMIT REVIEW
  ========================= */
  const submitReview = async () => {
    try {
      await axios.post(
        `/user/rating/${id}`,
        {
          rating: myRating,
          review: reviewText,
        }
      );

      loadStore();
    } catch (error) {
      console.error(error);
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold dark:bg-[#020817]">
        Loading...
      </div>
    );
  }

  /* =========================
     STORE NOT FOUND
  ========================= */
  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold dark:bg-[#020817]">
        Store not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817]">
      {/* HERO IMAGE */}
      <div className="relative h-[350px] md:h-[500px] overflow-hidden">
        {store.image ? (
          <img
            src={getImageUrl(
              store.image
            )}
            alt={store.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 dark:bg-slate-800 flex items-center justify-center">
            No Image
          </div>
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="
            absolute top-6 left-6
            flex items-center gap-2
            px-5 py-3
            rounded-2xl
            bg-white/20 backdrop-blur-md
            text-white
            hover:bg-white/30
            transition-all
          "
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HERO CONTENT */}
        <div className="absolute bottom-10 left-6 md:left-10 text-white max-w-3xl">
          <div className="flex gap-3 flex-wrap mb-4">
            {store.category && (
              <span className="px-4 py-2 rounded-full bg-indigo-500/80 backdrop-blur-md text-sm font-medium">
                {store.category}
              </span>
            )}

            {store.featured && (
              <span className="px-4 py-2 rounded-full bg-yellow-400 text-black font-bold text-sm">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold">
            {store.name}
          </h1>

          <div className="flex items-center gap-2 mt-4 text-white/90">
            <MapPin size={18} />
            {store.address}
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl">
              <Star
                size={18}
                fill="black"
              />

              {store.avgRating?.toFixed(
                1
              ) || 0}
            </div>

            <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl">
              {store.totalRatings || 0}{" "}
              Reviews
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* ABOUT */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
              About Store
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-8">
              {store.description ||
                "No description added yet."}
            </p>

            {/* EXTRA INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
              {store.phone && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-slate-800">
                  <Phone
                    className="text-indigo-500"
                    size={20}
                  />

                  <span className="dark:text-white">
                    {store.phone}
                  </span>
                </div>
              )}

              {store.website && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-slate-800">
                  <Globe
                    className="text-indigo-500"
                    size={20}
                  />

                  <a
                    href={store.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-500 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}

              {store.city && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-slate-800">
                  <Building2
                    className="text-indigo-500"
                    size={20}
                  />

                  <span className="dark:text-white">
                    {store.city}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* REVIEWS */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare
                className="text-indigo-500"
                size={24}
              />

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No reviews yet
              </div>
            ) : (
              <div className="space-y-5">
                {reviews.map((r) => (
                  <div
                    key={r._id}
                    className="
                      p-5
                      rounded-2xl
                      bg-gray-100 dark:bg-slate-800
                      border border-gray-200 dark:border-slate-700
                    "
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {r.user?.name ||
                            "Anonymous"}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(
                            r.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-xl font-bold">
                        ⭐ {r.rating}
                      </div>
                    </div>

                    {r.review && (
                      <p className="mt-4 text-gray-700 dark:text-gray-300 leading-7">
                        {r.review}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Rate This Store
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Share your experience
            </p>

            {/* STARS */}
            <div className="mt-6">
              <RatingStars
                value={myRating}
                onChange={setMyRating}
              />
            </div>

            {myRating > 0 && (
              <p className="mt-3 text-indigo-500 font-medium">
                Your Rating: {myRating} ⭐
              </p>
            )}

            {/* REVIEW */}
            <textarea
              rows={5}
              value={reviewText}
              onChange={(e) =>
                setReviewText(
                  e.target.value
                )
              }
              placeholder="Write your review..."
              className="
                w-full
                mt-6
                p-4
                rounded-2xl
                border
                border-gray-300 dark:border-slate-700
                bg-gray-50 dark:bg-slate-800
                text-gray-900 dark:text-white
                outline-none
                focus:border-indigo-500
                resize-none
              "
            />

            {/* BUTTON */}
            <button
              onClick={submitReview}
              className="
                w-full
                mt-6
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-purple-500
                hover:from-indigo-400
                hover:to-purple-400
                text-white
                font-bold
                shadow-xl
                transition-all
                duration-300
              "
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}