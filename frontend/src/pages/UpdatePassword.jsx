import { useState } from "react";
import axios from "../services/api";

export default function UpdatePassword() {
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await axios.put("/auth/password", { password: pass });
    setMsg(data.msg);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form className="bg-white p-6 shadow rounded max-w-md w-full" onSubmit={submit}>
        <h2 className="text-xl font-semibold mb-4">Update Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="border rounded p-2 w-full mb-3"
          onChange={(e)=>setPass(e.target.value)}
        />
        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Update
        </button>
        {msg && <p className="text-blue-600 mt-3">{msg}</p>}
      </form>
    </div>
  );
}
