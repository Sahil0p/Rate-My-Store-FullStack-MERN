// import { Link, Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Landing() {
//   const { user } = useAuth();

//   // 🔁 Redirect logged-in users to their dashboard
//   if (user) {
//     if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" />;
//     if (user.role === "OWNER") return <Navigate to="/owner/dashboard" />;
//     if (user.role === "USER") return <Navigate to="/user/stores" />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800
//                     flex flex-col items-center justify-center text-center px-4">
//       <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4">
//         Discover, Review & Improve Local Stores
//       </h1>

//       <p className="text-lg text-gray-300 max-w-2xl">
//         RateMyStore helps customers find the best stores and helps
//         business owners grow using real feedback.
//       </p>

//       <div className="flex gap-4 mt-8">
//         <Link to="/signup" className="btn-primary">
//           Get Started
//         </Link>

//         <Link
//           to="/login"
//           className="px-6 py-3 rounded-full border border-blue-400
//                      text-blue-400 hover:bg-blue-400 hover:text-white
//                      transition"
//         >
//           Log In
//         </Link>
//       </div>

//       <img
//         src="https://cdn-icons-png.flaticon.com/512/2038/2038725.png"
//         alt="store"
//         className="mt-10 w-52 opacity-90 animate-page-enter"
//       />
//     </div>
//   );
// }


import {
  Link,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  Star,
  Store,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function Landing() {
  const { user } = useAuth();

  /* =========================
     REDIRECT LOGGED USERS
  ========================= */
  if (user) {
    if (user.role === "ADMIN") {
      return (
        <Navigate to="/admin/dashboard" />
      );
    }

    if (user.role === "OWNER") {
      return (
        <Navigate to="/owner/dashboard" />
      );
    }

    if (user.role === "USER") {
      return (
        <Navigate to="/user/stores" />
      );
    }
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        min-h-screen
        bg-[#020817]
        text-white
      "
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-indigo-500/30 rounded-full blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-500/30 rounded-full blur-3xl" />

      {/* HERO SECTION */}
      <section
        className="
          relative
          z-10
          px-6
          md:px-12
          py-20
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-14
          items-center
        "
      >
        {/* LEFT */}
        <div>
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-indigo-500/10
              border
              border-indigo-500/20
              text-indigo-300
              text-sm
              mb-6
            "
          >
            <Star size={16} />
            Trusted by local shoppers
          </div>

          <h1
            className="
              text-5xl
              md:text-7xl
              font-extrabold
              leading-tight
            "
          >
            Discover &
            <span
              className="
                bg-gradient-to-r
                from-indigo-400
                to-purple-400
                bg-clip-text
                text-transparent
              "
            >
              {" "}
              Review{" "}
            </span>
            Local Stores
          </h1>

          <p
            className="
              mt-6
              text-lg
              text-gray-300
              max-w-2xl
              leading-relaxed
            "
          >
            RateMyStore helps users
            discover trusted stores,
            share reviews, and help
            businesses grow using real
            customer feedback.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/signup"
              className="
                px-8
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-purple-500
                font-semibold
                shadow-xl
                hover:scale-105
                transition-all
              "
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="
                px-8
                py-4
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                hover:bg-white/10
                transition-all
              "
            >
              Login
            </Link>
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-14 flex-wrap">
            <div>
              <h3 className="text-3xl font-bold">
                10K+
              </h3>
              <p className="text-gray-400 mt-1">
                Store Reviews
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                5K+
              </h3>
              <p className="text-gray-400 mt-1">
                Happy Users
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">
                500+
              </h3>
              <p className="text-gray-400 mt-1">
                Listed Stores
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          {/* MAIN CARD */}
          <div
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-white/10
              backdrop-blur-2xl
              p-6
              shadow-2xl
            "
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
              alt="Store"
              className="
                w-full
                h-[320px]
                object-contain
                drop-shadow-2xl
              "
            />

            {/* FLOATING CARD */}
            <div
              className="
                absolute
                -bottom-8
                -left-8
                bg-white
                text-black
                rounded-2xl
                p-4
                shadow-2xl
                w-52
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-yellow-400
                    flex
                    items-center
                    justify-center
                  "
                >
                  ⭐
                </div>

                <div>
                  <h4 className="font-bold">
                    4.9 Ratings
                  </h4>

                  <p className="text-sm text-gray-500">
                    Top Rated Stores
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-12
          pb-24
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >
          {/* CARD 1 */}
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
              hover:bg-white/10
              transition-all
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-indigo-500/20
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <Store
                size={28}
                className="text-indigo-300"
              />
            </div>

            <h3 className="text-2xl font-bold">
              Discover Stores
            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Explore local businesses
              and discover highly rated
              shopping experiences.
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
              hover:bg-white/10
              transition-all
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-yellow-500/20
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <ShieldCheck
                size={28}
                className="text-yellow-300"
              />
            </div>

            <h3 className="text-2xl font-bold">
              Trusted Reviews
            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Read authentic ratings and
              reviews from real users
              before visiting stores.
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-8
              hover:bg-white/10
              transition-all
            "
          >
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-green-500/20
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <TrendingUp
                size={28}
                className="text-green-300"
              />
            </div>

            <h3 className="text-2xl font-bold">
              Grow Businesses
            </h3>

            <p className="text-gray-400 mt-3 leading-relaxed">
              Help store owners improve
              their services through
              valuable customer feedback.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}