// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useTheme } from "../context/ThemeContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { theme, toggleTheme } = useTheme();
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const logoutHandler = () => {
//     logout();
//     navigate("/");
//     setOpen(false);
//   };

//   const NavLinks = () => (
//     <>
//       {!user && (
//         <>
//           <Link to="/login?role=USER">Login as User</Link>
//           <Link to="/login?role=OWNER">Login as Owner</Link>
//           <Link to="/signup?role=USER">Signup as User</Link>
//           <Link to="/signup?role=OWNER">Signup as Owner</Link>
//         </>
//       )}

//       {user?.role === "USER" && <Link to="/user/stores">Stores</Link>}
//       {/* {user?.role === "ADMIN" && <Link to="/admin/dashboard">Admin</Link>} */}
//       {user?.role === "ADMIN" && (
//   <div className="flex gap-4">
//     <Link to="/admin/dashboard">Dashboard</Link>
//     <Link to="/admin/users">Users</Link>
//     <Link to="/admin/stores">Stores</Link>
//   </div>
// )}

//       {user?.role === "OWNER" && <Link to="/owner/dashboard">Owner</Link>}

//       {user && (
//         <button onClick={logoutHandler} className="text-red-500 text-left">
//           Logout
//         </button>
//       )}
//     </>
//   );

//   return (
//     <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b px-6 py-4">
//       <div className="flex justify-between items-center">
//         <Link to="/" className="font-bold text-xl text-blue-600">
//           ⭐ RateMyStore
//         </Link>

//         {/* Desktop */}
//         <div className="hidden md:flex gap-6 items-center">
//           <NavLinks />
//           <button onClick={toggleTheme}>
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//         </div>

//         {/* Mobile */}
//         <button onClick={() => setOpen(true)} className="md:hidden text-2xl">
//           ☰
//         </button>
//       </div>

//       {/* Drawer */}
//       {open && (
//         <div className="fixed inset-0 bg-black/40 z-50">
//           <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 p-6 animate-page-enter">
//             <button onClick={() => setOpen(false)} className="mb-6">
//               ✕
//             </button>
//             <div className="flex flex-col gap-4">
//               <NavLinks />
//               <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  /* =====================
     AUTH DROPDOWNS
  ===================== */
  const AuthMenus = () => (
    <div className="flex gap-6 items-center">
      {/* LOGIN DROPDOWN */}
      <div className="relative">
        <button
          onClick={() => {
            setLoginOpen(!loginOpen);
            setSignupOpen(false);
          }}
          className="hover:text-blue-500"
        >
          Login
        </button>

        {loginOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800
                          rounded-xl shadow-lg border z-50">
            <Link
              to="/login?role=USER"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setLoginOpen(false)}
            >
              Login as User
            </Link>
            <Link
              to="/login?role=OWNER"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setLoginOpen(false)}
            >
              Login as Owner
            </Link>
          </div>
        )}
      </div>

      {/* SIGNUP DROPDOWN */}
      <div className="relative">
        <button
          onClick={() => {
            setSignupOpen(!signupOpen);
            setLoginOpen(false);
          }}
          className="hover:text-blue-500"
        >
          Signup
        </button>

        {signupOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800
                          rounded-xl shadow-lg border z-50">
            <Link
              to="/signup?role=USER"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setSignupOpen(false)}
            >
              Signup as User
            </Link>
            <Link
              to="/signup?role=OWNER"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setSignupOpen(false)}
            >
              Signup as Owner
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  /* =====================
     ROLE LINKS
  ===================== */
  const RoleLinks = () => (
    <>
      {user?.role === "USER" && (
        <Link to="/user/stores" className="hover:text-blue-500">
          Stores
        </Link>
      )}

      {user?.role === "OWNER" && (
        <Link to="/owner/dashboard" className="hover:text-blue-500">
          Owner Dashboard
        </Link>
      )}

      {user?.role === "ADMIN" && (
        <div className="flex gap-6">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/stores">Stores</Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900
                    border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4
                      flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="font-bold text-xl text-blue-600 flex items-center gap-2"
        >
          ⭐ RateMyStore
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-8 items-center">
          {!user && <AuthMenus />}
          <RoleLinks />

          {user && (
            <button
              onClick={logoutHandler}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          )}

          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* =====================
         MOBILE DRAWER
      ===================== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div
            className="absolute right-0 top-0 h-full w-72
                       bg-white dark:bg-gray-900 p-6
                       flex flex-col gap-5"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end text-xl"
            >
              ✕
            </button>

            {!user && (
              <>
                <p className="font-semibold text-sm text-gray-500">Login</p>
                <Link to="/login?role=USER" onClick={() => setMobileOpen(false)}>
                  Login as User
                </Link>
                <Link to="/login?role=OWNER" onClick={() => setMobileOpen(false)}>
                  Login as Owner
                </Link>

                <p className="font-semibold text-sm text-gray-500 mt-4">Signup</p>
                <Link to="/signup?role=USER" onClick={() => setMobileOpen(false)}>
                  Signup as User
                </Link>
                <Link to="/signup?role=OWNER" onClick={() => setMobileOpen(false)}>
                  Signup as Owner
                </Link>
              </>
            )}

            <RoleLinks />

            {user && (
              <button
                onClick={logoutHandler}
                className="text-red-500 text-left mt-4"
              >
                Logout
              </button>
            )}

            <button onClick={toggleTheme} className="mt-auto">
              {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
