import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Store,
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
  UserCircle2,
  ShieldCheck,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const loginRef = useRef();
  const signupRef = useRef();

  const logoutHandler = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (
        loginRef.current &&
        !loginRef.current.contains(e.target)
      ) {
        setLoginOpen(false);
      }

      if (
        signupRef.current &&
        !signupRef.current.contains(e.target)
      ) {
        setSignupOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  /* =========================
     AUTH DROPDOWNS
  ========================= */
  const AuthMenus = () => (
    <div className="flex items-center gap-4">
      {/* LOGIN */}
      <div className="relative" ref={loginRef}>
        <button
          onClick={() => {
            setLoginOpen(!loginOpen);
            setSignupOpen(false);
          }}
          className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-full
            border border-white/10
            bg-white/5
            hover:bg-white/10
            transition-all
            duration-300
            text-sm
            font-medium
          "
        >
          Login
          <ChevronDown
            size={16}
            className={`transition-transform ${
              loginOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {loginOpen && (
          <div
            className="
              absolute right-0 mt-3 w-56
              rounded-2xl
              overflow-hidden
              border border-white/10
              bg-white dark:bg-slate-900
              shadow-2xl
              backdrop-blur-xl
              animate-in fade-in zoom-in-95
              z-50
            "
          >
            <Link
              to="/login?role=USER"
              onClick={() => setLoginOpen(false)}
              className="
                flex items-center gap-3
                px-5 py-4
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition
              "
            >
              <UserCircle2 size={18} />
              Login as User
            </Link>

            <Link
              to="/login?role=OWNER"
              onClick={() => setLoginOpen(false)}
              className="
                flex items-center gap-3
                px-5 py-4
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition
              "
            >
              <Store size={18} />
              Login as Owner
            </Link>
          </div>
        )}
      </div>

      {/* SIGNUP */}
      <div className="relative" ref={signupRef}>
        <button
          onClick={() => {
            setSignupOpen(!signupOpen);
            setLoginOpen(false);
          }}
          className="
            flex items-center gap-2
            px-5 py-2.5
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            via-purple-500
            to-pink-500
            text-white
            shadow-lg
            hover:scale-105
            transition-all
            duration-300
            text-sm
            font-semibold
          "
        >
          Signup
          <ChevronDown
            size={16}
            className={`transition-transform ${
              signupOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {signupOpen && (
          <div
            className="
              absolute right-0 mt-3 w-56
              rounded-2xl
              overflow-hidden
              border border-white/10
              bg-white dark:bg-slate-900
              shadow-2xl
              backdrop-blur-xl
              animate-in fade-in zoom-in-95
              z-50
            "
          >
            <Link
              to="/signup?role=USER"
              onClick={() => setSignupOpen(false)}
              className="
                flex items-center gap-3
                px-5 py-4
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition
              "
            >
              <UserCircle2 size={18} />
              Signup as User
            </Link>

            <Link
              to="/signup?role=OWNER"
              onClick={() => setSignupOpen(false)}
              className="
                flex items-center gap-3
                px-5 py-4
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition
              "
            >
              <Store size={18} />
              Signup as Owner
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  /* =========================
     ROLE LINKS
  ========================= */
  const RoleLinks = () => (
    <div className="flex items-center gap-6">
      {user?.role === "USER" && (
        <Link
          to="/user/stores"
          className="
            flex items-center gap-2
            hover:text-indigo-500
            transition
          "
        >
          <Store size={18} />
          Stores
        </Link>
      )}

      {user?.role === "OWNER" && (
        <Link
          to="/owner/dashboard"
          className="
            flex items-center gap-2
            hover:text-indigo-500
            transition
          "
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>
      )}

      {user?.role === "ADMIN" && (
        <>
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 hover:text-indigo-500 transition"
          >
            <ShieldCheck size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-2 hover:text-indigo-500 transition"
          >
            <Users size={18} />
            Users
          </Link>

          <Link
            to="/admin/stores"
            className="flex items-center gap-2 hover:text-indigo-500 transition"
          >
            <Building2 size={18} />
            Stores
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      <nav
        className="
          sticky top-0 z-50
          border-b border-white/10
          bg-white/70 dark:bg-slate-950/70
          backdrop-blur-2xl
          shadow-lg
        "
      >
        <div
          className="
            max-w-7xl mx-auto
            px-6 py-4
            flex items-center justify-between
          "
        >
          {/* LOGO */}
          <Link
            to="/"
            className="
              flex items-center gap-3
              group
            "
          >
            <div
              className="
                w-11 h-11
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                via-purple-500
                to-pink-500
                flex items-center justify-center
                text-white
                shadow-xl
                group-hover:scale-110
                transition
              "
            >
              ⭐
            </div>

            <div>
              <h1
                className="
                  text-xl font-extrabold
                  bg-gradient-to-r
                  from-indigo-500
                  to-pink-500
                  bg-clip-text
                  text-transparent
                "
              >
                RateMyStore
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Review & Rating Platform
              </p>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-8">
            {!user && <AuthMenus />}

            <RoleLinks />

            {user && (
              <div className="flex items-center gap-4">
                <div
                  className="
                    px-4 py-2
                    rounded-full
                    bg-indigo-500/10
                    text-indigo-500
                    text-sm
                    font-semibold
                  "
                >
                  {user.name}
                </div>

                <button
                  onClick={logoutHandler}
                  className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-full
                    bg-red-500/10
                    text-red-500
                    hover:bg-red-500
                    hover:text-white
                    transition-all
                  "
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}

            {/* THEME BUTTON */}
            <button
              onClick={toggleTheme}
              className="
                w-12 h-12
                rounded-2xl
                bg-gray-100 dark:bg-slate-800
                flex items-center justify-center
                hover:scale-110
                transition-all
              "
            >
              {theme === "light" ? (
                <Moon size={20} />
              ) : (
                <Sun size={20} />
              )}
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="
              lg:hidden
              w-12 h-12
              rounded-2xl
              bg-gray-100 dark:bg-slate-800
              flex items-center justify-center
            "
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* =========================
          MOBILE DRAWER
      ========================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div
            className="
              absolute right-0 top-0
              h-full w-[320px]
              bg-white dark:bg-slate-950
              border-l border-white/10
              shadow-2xl
              p-6
              flex flex-col
            "
          >
            {/* TOP */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                Menu
              </h2>

              <button
                onClick={() => setMobileOpen(false)}
                className="
                  w-10 h-10
                  rounded-xl
                  bg-gray-100 dark:bg-slate-800
                  flex items-center justify-center
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* USER */}
            {user && (
              <div
                className="
                  mb-6
                  p-4 rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500/10
                  to-pink-500/10
                  border border-indigo-500/10
                "
              >
                <p className="font-bold text-lg">
                  {user.name}
                </p>

                <p className="text-sm text-gray-500">
                  {user.role}
                </p>
              </div>
            )}

            {/* LINKS */}
            <div className="flex flex-col gap-4 text-lg">
              {!user && (
                <>
                  <Link
                    to="/login?role=USER"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login as User
                  </Link>

                  <Link
                    to="/login?role=OWNER"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login as Owner
                  </Link>

                  <Link
                    to="/signup?role=USER"
                    onClick={() => setMobileOpen(false)}
                  >
                    Signup as User
                  </Link>

                  <Link
                    to="/signup?role=OWNER"
                    onClick={() => setMobileOpen(false)}
                  >
                    Signup as Owner
                  </Link>
                </>
              )}

              {user?.role === "USER" && (
                <Link
                  to="/user/stores"
                  onClick={() => setMobileOpen(false)}
                >
                  Stores
                </Link>
              )}

              {user?.role === "OWNER" && (
                <Link
                  to="/owner/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {user?.role === "ADMIN" && (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/admin/users"
                    onClick={() => setMobileOpen(false)}
                  >
                    Users
                  </Link>

                  <Link
                    to="/admin/stores"
                    onClick={() => setMobileOpen(false)}
                  >
                    Stores
                  </Link>
                </>
              )}
            </div>

            {/* FOOTER */}
            <div className="mt-auto space-y-4">
              {user && (
                <button
                  onClick={logoutHandler}
                  className="
                    w-full
                    flex items-center justify-center gap-2
                    py-3
                    rounded-2xl
                    bg-red-500
                    text-white
                    font-semibold
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}

              <button
                onClick={toggleTheme}
                className="
                  w-full
                  py-3
                  rounded-2xl
                  bg-gray-100 dark:bg-slate-800
                  flex items-center justify-center gap-2
                  font-medium
                "
              >
                {theme === "light" ? (
                  <>
                    <Moon size={18} />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun size={18} />
                    Light Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


