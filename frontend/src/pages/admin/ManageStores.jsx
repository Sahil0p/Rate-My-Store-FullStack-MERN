// import { useEffect, useState } from "react";
// import axios from "../../services/api";
// import toast from "react-hot-toast";

// export default function ManageStores() {
//   const [stores, setStores] = useState([]);
//   const [owners, setOwners] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     owner: "",
//     image: "", // ✅ NEW
//   });

//   const loadData = async () => {
//     const s = await axios.get("/admin/stores");
//     const u = await axios.get("/admin/users");
//     setStores(s.data);
//     setOwners(u.data.filter((x) => x.role === "OWNER"));
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const submit = async () => {
//     if (!form.name || !form.address || !form.owner) {
//       toast.error("Name, address & owner are required");
//       return;
//     }

//     try {
//       if (editId) {
//         await axios.put(`/admin/stores/${editId}`, form);
//         toast.success("Store updated");
//       } else {
//         await axios.post("/admin/stores", form);
//         toast.success("Store created");
//       }

//       setOpen(false);
//       setEditId(null);
//       setForm({ name: "", address: "", owner: "", image: "" });
//       loadData();
//     } catch (e) {
//       toast.error(e.response?.data?.msg || "Error");
//     }
//   };

//   const editStore = (s) => {
//     setEditId(s._id);
//     setForm({
//       name: s.name,
//       address: s.address,
//       owner: s.owner?._id,
//       image: s.image || "",
//     });
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

//               {/* ✅ STORE IMAGE PREVIEW */}
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

//             {/* ✅ IMAGE URL INPUT */}
//             <input
//               className="input mb-3"
//               placeholder="Image URL (optional)"
//               value={form.image}
//               onChange={(e) =>
//                 setForm({ ...form, image: e.target.value })
//               }
//             />

//             {form.image && (
//               <img
//                 src={form.image}
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

export default function ManageStores() {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    address: "",
    owner: "",
    image: null, // ✅ FILE (not string)
  });

  const loadData = async () => {
    const s = await axios.get("/admin/stores");
    const u = await axios.get("/admin/users");
    setStores(s.data);
    setOwners(u.data.filter((x) => x.role === "OWNER"));
  };

  useEffect(() => {
    loadData();
  }, []);

  /* =========================
     SUBMIT (FormData)
  ========================= */
  const submit = async () => {
    if (!form.name || !form.address || !form.owner) {
      toast.error("Name, address & owner are required");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("address", form.address);
      fd.append("owner", form.owner);
      if (form.image) fd.append("image", form.image);

      if (editId) {
        await axios.put(`/admin/stores/${editId}`, fd);
        toast.success("Store updated");
      } else {
        await axios.post("/admin/stores", fd);
        toast.success("Store created");
      }

      setOpen(false);
      setEditId(null);
      setPreview(null);
      setForm({ name: "", address: "", owner: "", image: null });
      loadData();
    } catch (e) {
      toast.error(e.response?.data?.msg || "Error");
    }
  };

  /* =========================
     EDIT STORE
  ========================= */
  const editStore = (s) => {
    setEditId(s._id);
    setForm({
      name: s.name,
      address: s.address,
      owner: s.owner?._id,
      image: null,
    });
    setPreview(s.image || null);
    setOpen(true);
  };

  const deleteStore = async (id) => {
    if (!confirm("Delete store?")) return;
    await axios.delete(`/admin/stores/${id}`);
    toast.success("Store deleted");
    loadData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Manage Stores</h2>
        <button onClick={() => setOpen(true)} className="btn-primary">
          + Add Store
        </button>
      </div>

      {/* STORE LIST */}
      <div className="grid-layout">
        {stores.map((s) => (
          <div key={s._id} className="card">
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-sm">{s.address}</p>
                <p className="text-sm mt-1">
                  Owner: {s.owner?.name}
                </p>
              </div>

              {s.image && (
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => editStore(s)}
                className="btn-primary"
              >
                Edit
              </button>

              <button
                onClick={() => deleteStore(s._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Store" : "Add Store"}
            </h3>

            <input
              className="input mb-3"
              placeholder="Store Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <textarea
              className="input mb-3"
              placeholder="Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            {/* ✅ FILE INPUT */}
            <input
              type="file"
              accept="image/*"
              className="mb-3"
              onChange={(e) => {
                const file = e.target.files[0];
                setForm({ ...form, image: file });
                setPreview(URL.createObjectURL(file));
              }}
            />

            {/* IMAGE PREVIEW */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mb-3 rounded-lg max-h-40 object-cover"
              />
            )}

            <select
              className="input mb-4"
              value={form.owner}
              onChange={(e) =>
                setForm({ ...form, owner: e.target.value })
              }
            >
              <option value="">Select Owner</option>
              {owners.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button onClick={submit} className="btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
