// import { useForm } from "react-hook-form";
// import { useNavigate, useSearchParams, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";

// export default function Login() {
//   const { login } = useAuth();
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
//       await login(data.email, data.password);

//       toast.success("Welcome back!");

//       if (role === "OWNER") navigate("/owner/dashboard");
//       else navigate("/user/stores");
//     } catch {
//       toast.error("Invalid credentials");
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
//                    border border-white/10"
//       >
//         {/* HEADER */}
//         <div className="text-center mb-6">
//           <h2 className="text-2xl font-bold">
//             {role === "OWNER" ? "Store Owner Login" : "User Login"}
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Login to continue
//           </p>
//         </div>
  
//         {/* EMAIL */}
//         <div className="mb-4">
//           <label className="text-sm font-medium">Email</label>
//           <input
//             {...register("email", { required: "Email required" })}
//             placeholder="you@example.com"
//             className="input mt-1"
//           />
//           {errors.email && (
//             <p className="text-xs text-red-500 mt-1">
//               {errors.email.message}
//             </p>
//           )}
//         </div>
  
//         {/* PASSWORD */}
//         <div className="mb-3">
//           <label className="text-sm font-medium">Password</label>
//           <div className="relative mt-1">
//             <input
//               {...register("password", { required: "Password required" })}
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               className="input pr-12"
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
  
//         {/* FORGOT PASSWORD */}
//         <div className="text-right mb-6">
//           <Link
//             to="/forgot-password"
//             className="text-sm text-blue-500 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>
  
//         {/* LOGIN BUTTON */}
//         <button
//           disabled={loading}
//           className={`w-full py-3 rounded-full font-semibold text-white
//             transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
//             }`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
  
//         {/* SIGNUP */}
//         <p className="text-sm text-center text-gray-500 mt-6">
//           Don’t have an account?{" "}
//           <Link
//             to={`/signup?role=${role}`}
//             className="text-blue-500 font-medium hover:underline"
//           >
//             Sign up
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

import { useAuth } from "../context/AuthContext";

import { useState } from "react";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Store,
  User,
} from "lucide-react";

export default function Login() {
  const { login } = useAuth();

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
     LOGIN
  ========================= */
  const submit = async (data) => {
    try {
      setLoading(true);

      await login(
        data.email,
        data.password
      );

      toast.success(
        "Welcome back!"
      );

      if (role === "OWNER") {
        navigate(
          "/owner/dashboard"
        );
      } else {
        navigate("/user/stores");
      }
    } catch {
      toast.error(
        "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div
  //     className="
  //       relative
  //       min-h-screen
  //       overflow-hidden
  //       flex
  //       items-center
  //       justify-center
  //       px-4
  //       bg-[#020817]
  //     "
  //   >
  //     {/* BACKGROUND GLOW */}
  //     <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-indigo-500/30 rounded-full blur-3xl" />

  //     <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-purple-500/30 rounded-full blur-3xl" />

  //     {/* CARD */}
  //     <form
  //       onSubmit={handleSubmit(submit)}
  //       className="
  //         relative
  //         z-10
  //         w-full
  //         max-w-md
  //         p-8
  //         md:p-10
  //         rounded-3xl
  //         border
  //         border-white/10
  //         bg-white/10
  //         backdrop-blur-2xl
  //         shadow-2xl
  //       "
  //     >
  //       {/* LOGO */}
  //       <div className="flex justify-center mb-5">
  //         <div
  //           className="
  //             w-20
  //             h-20
  //             rounded-3xl
  //             bg-gradient-to-r
  //             from-indigo-500
  //             to-purple-500
  //             flex
  //             items-center
  //             justify-center
  //             shadow-xl
  //           "
  //         >
  //           {role === "OWNER" ? (
  //             <Store
  //               size={36}
  //               className="text-white"
  //             />
  //           ) : (
  //             <User
  //               size={36}
  //               className="text-white"
  //             />
  //           )}
  //         </div>
  //       </div>

  //       {/* HEADER */}
  //       <div className="text-center mb-8">
  //         <h2 className="text-3xl font-extrabold text-white">
  //           {role === "OWNER"
  //             ? "Owner Login"
  //             : "Welcome Back"}
  //         </h2>

  //         <p className="text-gray-300 mt-2">
  //           Login to continue your
  //           journey
  //         </p>
  //       </div>

  //       {/* EMAIL */}
  //       <div className="mb-5">
  //         <label className="text-sm text-gray-300">
  //           Email Address
  //         </label>

  //         <div className="relative mt-2">
  //           <Mail
  //             size={18}
  //             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  //           />

  //           <input
  //             {...register("email", {
  //               required:
  //                 "Email required",
  //             })}
  //             placeholder="you@example.com"
  //             className="
  //               w-full
  //               pl-12
  //               pr-4
  //               py-4
  //               rounded-2xl
  //               bg-white/10
  //               border
  //               border-white/10
  //               text-white
  //               placeholder-gray-400
  //               outline-none
  //               focus:border-indigo-500
  //               focus:bg-white/15
  //               transition-all
  //             "
  //           />
  //         </div>

  //         {errors.email && (
  //           <p className="text-red-400 text-xs mt-2">
  //             {
  //               errors.email
  //                 .message
  //             }
  //           </p>
  //         )}
  //       </div>

  //       {/* PASSWORD */}
  //       <div className="mb-4">
  //         <label className="text-sm text-gray-300">
  //           Password
  //         </label>

  //         <div className="relative mt-2">
  //           <Lock
  //             size={18}
  //             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
  //           />

  //           <input
  //             {...register(
  //               "password",
  //               {
  //                 required:
  //                   "Password required",
  //               }
  //             )}
  //             type={
  //               showPassword
  //                 ? "text"
  //                 : "password"
  //             }
  //             placeholder="••••••••"
  //             className="
  //               w-full
  //               pl-12
  //               pr-12
  //               py-4
  //               rounded-2xl
  //               bg-white/10
  //               border
  //               border-white/10
  //               text-white
  //               placeholder-gray-400
  //               outline-none
  //               focus:border-indigo-500
  //               focus:bg-white/15
  //               transition-all
  //             "
  //           />

  //           <button
  //             type="button"
  //             onClick={() =>
  //               setShowPassword(
  //                 !showPassword
  //               )
  //             }
  //             className="
  //               absolute
  //               right-4
  //               top-1/2
  //               -translate-y-1/2
  //               text-gray-400
  //               hover:text-white
  //             "
  //           >
  //             {showPassword ? (
  //               <EyeOff size={18} />
  //             ) : (
  //               <Eye size={18} />
  //             )}
  //           </button>
  //         </div>

  //         {errors.password && (
  //           <p className="text-red-400 text-xs mt-2">
  //             {
  //               errors.password
  //                 .message
  //             }
  //           </p>
  //         )}
  //       </div>

  //       {/* FORGOT */}
  //       <div className="text-right mb-7">
  //         <Link
  //           to="/forgot-password"
  //           className="
  //             text-sm
  //             text-indigo-400
  //             hover:text-indigo-300
  //             transition
  //           "
  //         >
  //           Forgot Password?
  //         </Link>
  //       </div>

  //       {/* BUTTON */}
  //       <button
  //         disabled={loading}
  //         className={`
  //           w-full
  //           py-4
  //           rounded-2xl
  //           font-bold
  //           text-white
  //           transition-all
  //           duration-300
  //           shadow-xl

  //           ${
  //             loading
  //               ? "bg-gray-500 cursor-not-allowed"
  //               : `
  //                 bg-gradient-to-r
  //                 from-indigo-500
  //                 to-purple-500
  //                 hover:scale-[1.02]
  //                 hover:shadow-indigo-500/40
  //               `
  //           }
  //         `}
  //       >
  //         {loading
  //           ? "Logging in..."
  //           : "Login"}
  //       </button>

  //       {/* DIVIDER */}
  //       <div className="flex items-center gap-4 my-7">
  //         <div className="flex-1 h-px bg-white/10" />

  //         <span className="text-sm text-gray-400">
  //           OR
  //         </span>

  //         <div className="flex-1 h-px bg-white/10" />
  //       </div>

  //       {/* SIGNUP */}
  //       <p className="text-center text-gray-300 text-sm">
  //         Don’t have an account?{" "}
  //         <Link
  //           to={`/signup?role=${role}`}
  //           className="
  //             text-indigo-400
  //             font-semibold
  //             hover:text-indigo-300
  //           "
  //         >
  //           Create Account
  //         </Link>
  //       </p>
  //     </form>
  //   </div>
  // );

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
        min-h-[700px]
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
            Welcome
            <br />
            Back 👋
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-md">
            Discover stores, rate experiences,
            and help businesses grow with real
            customer feedback.
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
            ⭐ 4.9 Average Ratings
          </p>

          <p className="mt-2 text-white/70 text-sm">
            Trusted by thousands of users and
            local businesses.
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
              Login
            </h2>

            <p className="text-gray-400 mt-3">
              Enter your credentials to continue
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="text-sm text-gray-300">
              Email
            </label>

            <input
              {...register("email", {
                required: "Email required",
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
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-sm text-gray-300">
              Password
            </label>

            <div className="relative mt-2">
              <input
                {...register("password", {
                  required: "Password required",
                })}
                type={showPassword ? "text" : "password"}
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
                  setShowPassword(!showPassword)
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
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* FORGOT */}
          <div className="text-right mb-8">
            <Link
              to="/forgot-password"
              className="text-indigo-400 text-sm hover:underline"
            >
              Forgot password?
            </Link>
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
              ? "Logging in..."
              : "Login"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-gray-400 mt-8">
            Don’t have an account?{" "}
            <Link
              to={`/signup?role=${role}`}
              className="text-indigo-400 font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
);

}