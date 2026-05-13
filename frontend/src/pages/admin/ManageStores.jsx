// import { useEffect, useState } from "react";
// import axios from "../../services/api";
// import toast from "react-hot-toast";

// export default function ManageStores() {
//   const [stores, setStores] = useState([]);
//   const [owners, setOwners] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     owner: "",
//     image: null, // ✅ FILE (not string)
//   });

//   const loadData = async () => {
//     const s = await axios.get("/admin/stores");
//     const u = await axios.get("/admin/users");
//     setStores(s.data);
//     setOwners(u.data.filter((x) => x.role === "OWNER"));
//   };

//   useEffect(() => {
//   const fetchData = async () => {
//     await loadData();
//   };

//   fetchData();
// }, []);

//   /* =========================
//      SUBMIT (FormData)
//   ========================= */
//   const submit = async () => {
//     if (!form.name || !form.address || !form.owner) {
//       toast.error("Name, address & owner are required");
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("address", form.address);
//       fd.append("owner", form.owner);
//       if (form.image) fd.append("image", form.image);

//       if (editId) {
//         await axios.put(`/admin/stores/${editId}`, fd);
//         toast.success("Store updated");
//       } else {
//         await axios.post("/admin/stores", fd);
//         toast.success("Store created");
//       }

//       setOpen(false);
//       setEditId(null);
//       setPreview(null);
//       setForm({ name: "", address: "", owner: "", image: null });
//       loadData();
//     } catch (e) {
//       toast.error(e.response?.data?.msg || "Error");
//     }
//   };

//   /* =========================
//      EDIT STORE
//   ========================= */
//   const editStore = (s) => {
//     setEditId(s._id);
//     setForm({
//       name: s.name,
//       address: s.address,
//       owner: s.owner?._id,
//       image: null,
//     });
//     setPreview(s.image || null);
//     setOpen(true);
//   };

//   const deleteStore = async (id) => {
//     if (!confirm("Delete store?")) return;
//     await axios.delete(`/admin/stores/${id}`);
//     toast.success("Store deleted");
//     loadData();
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-2xl font-bold">Manage Stores</h2>
//         <button onClick={() => setOpen(true)} className="btn-primary">
//           + Add Store
//         </button>
//       </div>

//       {/* STORE LIST */}
//       <div className="grid-layout">
//         {stores.map((s) => (
//           <div key={s._id} className="card">
//             <div className="flex justify-between gap-4">
//               <div>
//                 <h3 className="font-semibold">{s.name}</h3>
//                 <p className="text-sm">{s.address}</p>
//                 <p className="text-sm mt-1">
//                   Owner: {s.owner?.name}
//                 </p>
//               </div>

//               {s.image && (
//                 <img
//                   src={s.image}
//                   alt={s.name}
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
//               )}
//             </div>

//             <div className="flex gap-2 mt-4">
//               <button
//                 onClick={() => editStore(s)}
//                 className="btn-primary"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => deleteStore(s._id)}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* MODAL */}
//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">
//               {editId ? "Edit Store" : "Add Store"}
//             </h3>

//             <input
//               className="input mb-3"
//               placeholder="Store Name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//             />

//             <textarea
//               className="input mb-3"
//               placeholder="Address"
//               value={form.address}
//               onChange={(e) =>
//                 setForm({ ...form, address: e.target.value })
//               }
//             />

//             {/* ✅ FILE INPUT */}
//             <input
//               type="file"
//               accept="image/*"
//               className="mb-3"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 setForm({ ...form, image: file });
//                 setPreview(URL.createObjectURL(file));
//               }}
//             />

//             {/* IMAGE PREVIEW */}
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="mb-3 rounded-lg max-h-40 object-cover"
//               />
//             )}

//             <select
//               className="input mb-4"
//               value={form.owner}
//               onChange={(e) =>
//                 setForm({ ...form, owner: e.target.value })
//               }
//             >
//               <option value="">Select Owner</option>
//               {owners.map((o) => (
//                 <option key={o._id} value={o._id}>
//                   {o.name}
//                 </option>
//               ))}
//             </select>

//             <div className="flex justify-end gap-3">
//               <button onClick={() => setOpen(false)}>
//                 Cancel
//               </button>
//               <button onClick={submit} className="btn-primary">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "../../services/api";
import toast from "react-hot-toast";

import {
  Store,
  Plus,
  MapPin,
  User,
  Pencil,
  Trash2,
  Star,
  Globe,
  Phone,
  Building2,
  X,
} from "lucide-react";

export default function ManageStores() {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    description: "",
    category: "",
    phone: "",
    website: "",
    city: "",
    featured: false,
    owner: "",
    image: null,
  });

  // ================= LOAD DATA =================
  const loadData = async () => {
    try {
      const s = await axios.get("/admin/stores");

      const u = await axios.get("/admin/users");

      setStores(s.data);

      setOwners(
        u.data.filter(
          (x) =>
            x.role === "OWNER" ||
            x.role === "owner"
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };

    fetchData();
  }, []);

  // ================= RESET FORM =================
  const resetForm = () => {
    setEditId(null);

    setPreview(null);

    setForm({
      name: "",
      address: "",
      description: "",
      category: "",
      phone: "",
      website: "",
      city: "",
      featured: false,
      owner: "",
      image: null,
    });
  };

  // ================= SUBMIT =================
  const submit = async () => {
    if (
      !form.name ||
      !form.address ||
      !form.owner
    ) {
      toast.error(
        "Name, address & owner are required"
      );

      return;
    }

    try {
      const fd = new FormData();

      fd.append("name", form.name);
      fd.append("address", form.address);
      fd.append(
        "description",
        form.description
      );
      fd.append("category", form.category);
      fd.append("phone", form.phone);
      fd.append("website", form.website);
      fd.append("city", form.city);
      fd.append("featured", form.featured);
      fd.append("owner", form.owner);

      if (form.image) {
        fd.append("image", form.image);
      }

      if (editId) {
        await axios.put(
          `/admin/stores/${editId}`,
          fd
        );

        toast.success("Store updated");
      } else {
        await axios.post("/admin/stores", fd);

        toast.success("Store created");
      }

      setOpen(false);

      resetForm();

      loadData();
    } catch (e) {
      console.error(e);

      toast.error(
        e.response?.data?.msg || "Error"
      );
    }
  };

  // ================= EDIT STORE =================
  const editStore = (s) => {
    setEditId(s._id);

    setForm({
      name: s.name || "",
      address: s.address || "",
      description: s.description || "",
      category: s.category || "",
      phone: s.phone || "",
      website: s.website || "",
      city: s.city || "",
      featured: s.featured || false,
      owner: s.owner?._id || "",
      image: null,
    });

    setPreview(s.image || null);

    setOpen(true);
  };

  // ================= DELETE =================
  const deleteStore = async (id) => {
    const ok = confirm(
      "Delete this store permanently?"
    );

    if (!ok) return;

    try {
      await axios.delete(`/admin/stores/${id}`);

      toast.success("Store deleted");

      loadData();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020817] p-4 md:p-8 transition-colors duration-300">
      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl mb-10">
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Store
                size={32}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                Manage Stores
              </h1>

              <p className="text-white/80 mt-2 text-lg">
                Create, edit and manage all stores.
              </p>
            </div>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            className="
              flex items-center gap-2
              px-6 py-3
              rounded-2xl
              bg-white
              text-indigo-700
              font-bold
              hover:scale-105
              transition-all
              shadow-lg
            "
          >
            <Plus size={20} />
            Add Store
          </button>
        </div>

        {/* GLOW */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ================= STORE GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
      
        {stores.map((s) => (
          <div
            key={s._id}
            className="
              overflow-hidden
              rounded-3xl
              bg-white dark:bg-slate-900
              border border-gray-200 dark:border-slate-800
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
            "
          >
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
              {s.image ? (
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              {/* FEATURED */}
              {s.featured && (
                <div className="absolute top-4 left-4 px-4 py-2 rounded-2xl bg-yellow-400 text-black font-bold flex items-center gap-2 shadow-lg">
                  <Star
                    size={16}
                    fill="black"
                  />
                  Featured
                </div>
              )}

              {/* CATEGORY */}
              {s.category && (
                <div className="absolute top-4 right-4 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md text-white font-semibold">
                  {s.category}
                </div>
              )}

              {/* TITLE */}
              <div className="absolute bottom-5 left-5 text-white">
                <h2 className="text-2xl font-bold">
                  {s.name}
                </h2>

                <div className="flex items-center gap-2 mt-1 text-white/80 text-sm">
                  <MapPin size={14} />
                  {s.address}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              {/* DESCRIPTION */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed min-h-[60px]">
                {s.description ||
                  "No description available."}
              </p>

              {/* INFO */}
              <div className="space-y-3 mt-5">
                {/* OWNER */}
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
                    <User
                      size={18}
                      className="text-indigo-600 dark:text-indigo-300"
                    />
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      Owner
                    </p>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {s.owner?.name ||
                        "No Owner"}
                    </p>
                  </div>
                </div>

                {/* PHONE */}
                {s.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                      <Phone
                        size={18}
                        className="text-green-600 dark:text-green-300"
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Phone
                      </p>

                      <p className="font-semibold text-gray-900 dark:text-white">
                        {s.phone}
                      </p>
                    </div>
                  </div>
                )}

                {/* WEBSITE */}
                {s.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center">
                      <Globe
                        size={18}
                        className="text-pink-600 dark:text-pink-300"
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Website
                      </p>

                      <a
                        href={s.website}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-blue-500 hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}

                {/* CITY */}
                {s.city && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center">
                      <Building2
                        size={18}
                        className="text-yellow-600 dark:text-yellow-300"
                      />
                    </div>

                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        City
                      </p>

                      <p className="font-semibold text-gray-900 dark:text-white">
                        {s.city}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => editStore(s)}
                  className="
                    flex-1
                    py-3
                    rounded-2xl
                    bg-indigo-500
                    hover:bg-indigo-600
                    text-white
                    font-semibold
                    flex items-center justify-center gap-2
                    transition-all
                  "
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteStore(s._id)
                  }
                  className="
                    flex-1
                    py-3
                    rounded-2xl
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    font-semibold
                    flex items-center justify-center gap-2
                    transition-all
                  "
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-gray-200 dark:border-slate-800">
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editId
                    ? "Edit Store"
                    : "Create Store"}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Fill all required information
                </p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6">
              {/* NAME */}
              <input
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none mb-4"
                placeholder="Store Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />

              {/* ADDRESS */}
              <textarea
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none mb-4 min-h-[90px]"
                placeholder="Store Address"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
              />

              {/* DESCRIPTION */}
              <textarea
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none mb-4 min-h-[120px]"
                placeholder="Store Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
              />

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* CATEGORY */}
                <input
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category:
                        e.target.value,
                    })
                  }
                />

                {/* CITY */}
                <input
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      city: e.target.value,
                    })
                  }
                />

                {/* PHONE */}
                <input
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                />

                {/* WEBSITE */}
                <input
                  className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none"
                  placeholder="Website URL"
                  value={form.website}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      website:
                        e.target.value,
                    })
                  }
                />
              </div>

              {/* OWNER */}
              <select
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white outline-none mb-4"
                value={form.owner}
                onChange={(e) =>
                  setForm({
                    ...form,
                    owner: e.target.value,
                  })
                }
              >
                <option value="">
                  Select Owner
                </option>

                {owners.map((o) => (
                  <option
                    key={o._id}
                    value={o._id}
                  >
                    {o.name}
                  </option>
                ))}
              </select>

              {/* FEATURED */}
              <label className="flex items-center gap-3 mb-5">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      featured:
                        e.target.checked,
                    })
                  }
                />

                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Featured Store
                </span>
              </label>

              {/* IMAGE */}
              <input
                type="file"
                accept="image/*"
                className="mb-4"
                onChange={(e) => {
                  const file =
                    e.target.files[0];

                  if (!file) return;

                  setForm({
                    ...form,
                    image: file,
                  });

                  setPreview(
                    URL.createObjectURL(
                      file
                    )
                  );
                }}
              />

              {/* PREVIEW */}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-72 object-cover rounded-2xl mb-4"
                />
              )}

              {/* ACTIONS */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setOpen(false);
                    resetForm();
                  }}
                  className="
                    px-6 py-3
                    rounded-2xl
                    bg-gray-200 dark:bg-slate-700
                    text-gray-800 dark:text-white
                    font-semibold
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={submit}
                  className="
                    px-6 py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-500
                    to-purple-500
                    hover:from-indigo-600
                    hover:to-purple-600
                    text-white
                    font-semibold
                    shadow-lg
                  "
                >
                  {editId
                    ? "Update Store"
                    : "Create Store"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}