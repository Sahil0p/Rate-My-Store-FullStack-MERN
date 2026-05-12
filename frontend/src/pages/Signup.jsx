import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../services/api";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role") || "USER";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        err.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
                    bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-white/95 dark:bg-gray-900/95
                   backdrop-blur-md p-8 rounded-2xl shadow-xl
                   border border-white/10 animate-fadein"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {role === "OWNER"
              ? "Signup as Store Owner"
              : "Create your account"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to continue
          </p>
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name (maximum 5 characters)"
            className="input"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="you@example.com"
            className="input"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ADDRESS (OPTIONAL) */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">
            Address
          </label>
          <input
            {...register("address")}
            placeholder="City, State (maximum 30 characters)"
            className="input"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm font-medium block mb-1">
            Password
          </label>

          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input pr-14"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-sm text-blue-500 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-full font-semibold text-white
            transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
            }`}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to={`/login?role=${role}`}
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
