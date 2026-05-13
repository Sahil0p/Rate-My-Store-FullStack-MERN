// import { useForm } from "react-hook-form";
// import { useNavigate, useSearchParams, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "../services/api";
// import { useState } from "react";

// export default function Signup() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const role = params.get("role") || "USER";

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const submit = async (data) => {
//     try {
//       setLoading(true);

//       await axios.post("/auth/signup", {
//         ...data,
//         role,
//       });

//       toast.success(
//         role === "OWNER"
//           ? "Store owner account created!"
//           : "Account created successfully!"
//       );

//       navigate(`/login?role=${role}`);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Signup failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4
//                     bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       <form
//         onSubmit={handleSubmit(submit)}
//         className="w-full max-w-md bg-white/95 dark:bg-gray-900/95
//                    backdrop-blur-md p-8 rounded-2xl shadow-xl
//                    border border-white/10 animate-fadein"
//       >
//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold">
//             {role === "OWNER"
//               ? "Signup as Store Owner"
//               : "Create your account"}
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill in the details to continue
//           </p>
//         </div>

//         {/* NAME */}
//         <div className="mb-4">
//           <label className="text-sm font-medium block mb-1">
//             Full Name
//           </label>
//           <input
//             {...register("name", { required: "Name is required" })}
//             placeholder="Name (maximum 5 characters)"
//             className="input"
//           />
//           {errors.name && (
//             <p className="text-xs text-red-500 mt-1">
//               {errors.name.message}
//             </p>
//           )}
//         </div>

//         {/* EMAIL */}
//         <div className="mb-4">
//           <label className="text-sm font-medium block mb-1">
//             Email
//           </label>
//           <input
//             {...register("email", { required: "Email is required" })}
//             placeholder="you@example.com"
//             className="input"
//           />
//           {errors.email && (
//             <p className="text-xs text-red-500 mt-1">
//               {errors.email.message}
//             </p>
//           )}
//         </div>

//         {/* ADDRESS (OPTIONAL) */}
//         <div className="mb-4">
//           <label className="text-sm font-medium block mb-1">
//             Address
//           </label>
//           <input
//             {...register("address")}
//             placeholder="City, State (maximum 30 characters)"
//             className="input"
//           />
//         </div>

//         {/* PASSWORD */}
//         <div className="mb-6">
//           <label className="text-sm font-medium block mb-1">
//             Password
//           </label>

//           <div className="relative">
//             <input
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Minimum 6 characters",
//                 },
//               })}
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               className="input pr-14"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2
//                          text-sm text-blue-500 hover:underline"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>

//           {errors.password && (
//             <p className="text-xs text-red-500 mt-1">
//               {errors.password.message}
//             </p>
//           )}
//         </div>

//         {/* SUBMIT */}
//         <button
//           disabled={loading}
//           className={`w-full py-3 rounded-full font-semibold text-white
//             transition-all duration-200 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
//             }`}
//         >
//           {loading ? "Creating account..." : "Create Account"}
//         </button>

//         {/* LOGIN LINK */}
//         <p className="text-sm text-center text-gray-500 mt-6">
//           Already have an account?{" "}
//           <Link
//             to={`/login?role=${role}`}
//             className="text-blue-500 font-medium hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }


import { useForm } from "react-hook-form";

import {
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import axios from "../services/api";

import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const role =
    params.get("role") || "USER";

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* =========================
     SIGNUP
  ========================= */
  const submit = async (data) => {
    try {
      setLoading(true);

      await axios.post("/auth/signup", {
        ...data,
        role,
      });

      toast.success(
        role === "OWNER"
          ? "Store owner account created!"
          : "Account created successfully!"
      );

      navigate(`/login?role=${role}`);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] flex items-center justify-center p-6">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-indigo-500/30 rounded-full blur-3xl" />

      <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-purple-500/30 rounded-full blur-3xl" />

      {/* MAIN CONTAINER */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          min-h-[720px]
          rounded-[40px]
          overflow-hidden
          border
          border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          grid
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            hidden lg:flex
            flex-col
            justify-between
            p-12
            bg-gradient-to-br
            from-indigo-600
            via-purple-600
            to-pink-500
            relative
            overflow-hidden
          "
        >
          {/* GRAPHICS */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

          <div className="absolute bottom-10 left-10 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Join
              <br />
              RateMyStore 🚀
            </h1>

            <p className="mt-6 text-lg text-white/80 max-w-md">
              Create your account and start
              discovering amazing stores,
              sharing reviews, and helping
              businesses grow.
            </p>
          </div>

          {/* FLOATING CARD */}
          <div
            className="
              relative
              z-10
              bg-white/10
              border
              border-white/20
              backdrop-blur-xl
              rounded-3xl
              p-6
              w-[320px]
            "
          >
            <p className="text-white text-lg font-semibold">
              ⭐ Trusted by thousands
            </p>

            <p className="mt-2 text-white/70 text-sm">
              Join our growing community of
              users and business owners.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <form
          onSubmit={handleSubmit(submit)}
          className="
            flex
            flex-col
            justify-center
            px-8
            md:px-16
            py-10
            bg-[#0f172a]/80
          "
        >
          <div className="max-w-md w-full mx-auto">
            {/* HEADER */}
            <div className="mb-10">
              <h2 className="text-4xl font-extrabold text-white">
                Create Account
              </h2>

              <p className="text-gray-400 mt-3">
                Fill in your details to get started
              </p>
            </div>

            {/* NAME */}
            <div className="mb-5">
              <label className="text-sm text-gray-300">
                Full Name
              </label>

              <input
                {...register("name", {
                  required:
                    "Name is required",
                })}
                placeholder="John Doe"
                className="
                  w-full
                  mt-2
                  px-5
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-indigo-500
                "
              />

              {errors.name && (
                <p className="text-red-400 text-xs mt-2">
                  {
                    errors.name
                      .message
                  }
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="text-sm text-gray-300">
                Email
              </label>

              <input
                {...register("email", {
                  required:
                    "Email is required",
                })}
                placeholder="you@example.com"
                className="
                  w-full
                  mt-2
                  px-5
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-indigo-500
                "
              />

              {errors.email && (
                <p className="text-red-400 text-xs mt-2">
                  {
                    errors.email
                      .message
                  }
                </p>
              )}
            </div>

            {/* ADDRESS */}
            <div className="mb-5">
              <label className="text-sm text-gray-300">
                Address
              </label>

              <input
                {...register("address")}
                placeholder="City, State"
                className="
                  w-full
                  mt-2
                  px-5
                  py-4
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-indigo-500
                "
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <label className="text-sm text-gray-300">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  {...register(
                    "password",
                    {
                      required:
                        "Password is required",
                      minLength: {
                        value: 6,
                        message:
                          "Minimum 6 characters",
                      },
                    }
                  )}
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  className="
                    w-full
                    px-5
                    py-4
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    text-white
                    placeholder-gray-500
                    outline-none
                    focus:border-indigo-500
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    text-indigo-400
                  "
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-400 text-xs mt-2">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-purple-500
                hover:scale-[1.02]
                transition-all
                font-bold
                text-white
                shadow-xl
              "
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

            {/* FOOTER */}
            <p className="text-center text-gray-400 mt-8">
              Already have an account?{" "}
              <Link
                to={`/login?role=${role}`}
                className="text-indigo-400 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}