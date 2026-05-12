import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
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
      await login(data.email, data.password);

      toast.success("Welcome back!");

      if (role === "OWNER") navigate("/owner/dashboard");
      else navigate("/user/stores");
    } catch {
      toast.error("Invalid credentials");
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
                   border border-white/10"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {role === "OWNER" ? "Store Owner Login" : "User Login"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Login to continue
          </p>
        </div>
  
        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm font-medium">Email</label>
          <input
            {...register("email", { required: "Email required" })}
            placeholder="you@example.com"
            className="input mt-1"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
  
        {/* PASSWORD */}
        <div className="mb-3">
          <label className="text-sm font-medium">Password</label>
          <div className="relative mt-1">
            <input
              {...register("password", { required: "Password required" })}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input pr-12"
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
  
        {/* FORGOT PASSWORD */}
        <div className="text-right mb-6">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
  
        {/* LOGIN BUTTON */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-full font-semibold text-white
            transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
  
        {/* SIGNUP */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to={`/signup?role=${role}`}
            className="text-blue-500 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
  
}
