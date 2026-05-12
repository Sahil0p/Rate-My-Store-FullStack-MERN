import { useEffect, useState } from "react";
import axios from "../../services/api";
import EmptyState from "../../components/EmptyState";

export default function AdminRatings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/admin/ratings")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && data.length === 0) {
    return (
      <EmptyState
        title="No ratings available"
        subtitle="Users have not rated any store yet"
      />
    );
  }

  return (
    <div className="p-6 animate-fadein">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Store Ratings & Analytics
      </h2>

      <div className="grid-layout">
        {data.map((store) => (
          <div key={store._id} className="card">
            <h3 className="font-semibold text-lg">
              {store.name}
            </h3>

            <p className="text-sm text-gray-500">
              {store.address}
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <p>⭐ Avg Rating: <b>{store.avgRating.toFixed(1)}</b></p>
              <p>🧾 Total Ratings: <b>{store.totalRatings}</b></p>
            </div>

            {/* SIMPLE ANALYTICS */}
            <div className="mt-4 space-y-1 text-xs text-gray-400">
              <p>⭐ 5 Stars: {store.breakdown[5] || 0}</p>
              <p>⭐ 4 Stars: {store.breakdown[4] || 0}</p>
              <p>⭐ 3 Stars: {store.breakdown[3] || 0}</p>
              <p>⭐ 2 Stars: {store.breakdown[2] || 0}</p>
              <p>⭐ 1 Star : {store.breakdown[1] || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
