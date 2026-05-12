import { useEffect, useState } from "react";
import axios from "../../services/api";
import Table from "../../components/Table";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-4">
        Manage Users
      </h2>

      <div className="card p-0">
        <Table columns={["Name", "Email", "Role"]} data={users} />
      </div>
    </div>
  );
}
