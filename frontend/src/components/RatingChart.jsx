// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
//   } from "recharts";
  
//   export default function RatingChart({ data }) {
//     return (
//       <div className="card">
//         <h3 className="font-semibold mb-4">Ratings Over Time</h3>
  
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={data}>
//             <XAxis dataKey="date" />
//             <YAxis domain={[0, 5]} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="rating"
//               stroke="#2563eb"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
  
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RatingChart({ ratings }) {
  const data = ratings.map((r) => ({
    date: new Date(r.createdAt).toLocaleDateString(),
    rating: r.rating,
  }));

  return (
    <div className="card">
      <h3 className="font-semibold mb-4">
        Ratings Over Time
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
