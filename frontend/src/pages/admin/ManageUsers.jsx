// import { useEffect, useState } from "react";
// import axios from "../../services/api";
// import Table from "../../components/Table";

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("/admin/users").then((res) => setUsers(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="font-bold text-2xl mb-4">
//         Manage Users
//       </h2>

//       <div className="card p-0">
//         <Table columns={["Name", "Email", "Role"]} data={users} />
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import axios from "../../services/api";

import {
  Users,
  Search,
  Shield,
  User,
  Crown,
  Mail,
} from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ================= LOAD USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "/admin/users"
        );

        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // ================= FILTER USERS =================
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();

      return (
        user.name
          ?.toLowerCase()
          .includes(query) ||
        user.email
          ?.toLowerCase()
          .includes(query) ||
        user.role
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [users, search]);

  // ================= STATS =================
  const stats = useMemo(() => {
    return {
      totalUsers: users.length,

      admins: users.filter(
        (u) => u.role === "admin"
      ).length,

      owners: users.filter(
        (u) => u.role === "owner"
      ).length,

      normalUsers: users.filter(
        (u) => u.role === "user"
      ).length,
    };
  }, [users]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] p-4 md:p-8 transition-colors duration-300">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-12 shadow-2xl mb-10">
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Users
              size={32}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Manage Users
            </h1>

            <p className="text-white/80 mt-2 text-lg">
              View and manage all platform users.
            </p>
          </div>
        </div>

        {/* GLOW */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {/* TOTAL USERS */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Users
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {stats.totalUsers}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
              <Users className="text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </div>

        {/* ADMINS */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Admins
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {stats.admins}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
              <Shield className="text-red-600 dark:text-red-300" />
            </div>
          </div>
        </div>

        {/* OWNERS */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Store Owners
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {stats.owners}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
              <Crown className="text-yellow-600 dark:text-yellow-300" />
            </div>
          </div>
        </div>

        {/* USERS */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Normal Users
              </p>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                {stats.normalUsers}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <User className="text-green-600 dark:text-green-300" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative mb-8 max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            pl-11
            pr-4
            py-3
            rounded-2xl
            bg-white dark:bg-slate-900
            border border-gray-200 dark:border-slate-700
            text-gray-900 dark:text-white
            outline-none
            focus:border-indigo-500
            shadow-sm
          "
        />
      </div>

      {/* ================= USERS TABLE ================= */}
      <div className="overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xl">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-gray-200 dark:border-slate-800 bg-gray-100 dark:bg-slate-800 font-semibold text-gray-700 dark:text-gray-300">
          <div className="col-span-5">User</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-3">Role</div>
        </div>

        {/* TABLE BODY */}
        <div>
          {filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-gray-500 dark:text-gray-400">
              No users found
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={user._id}
                className="
                  grid
                  grid-cols-12
                  gap-4
                  px-6
                  py-5
                  border-b
                  border-gray-100
                  dark:border-slate-800
                  hover:bg-gray-50
                  dark:hover:bg-slate-800/50
                  transition-all
                "
              >
                {/* USER */}
                <div className="col-span-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-300">
                    {user.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      User #{index + 1}
                    </p>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="col-span-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Mail size={16} />
                  {user.email}
                </div>

                {/* ROLE */}
                <div className="col-span-3 flex items-center">
                  <div
                    className={`
                      px-4 py-2 rounded-xl text-sm font-bold
                      ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                          : user.role === "owner"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                          : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
                      }
                    `}
                  >
                    {user.role}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}