import { useState } from "react";

export default function Table({ columns, data }) {
  const [query, setQuery] = useState("");

  const filtered = data.filter((row) =>
    columns.some((c) =>
      String(row[c.toLowerCase()] || "")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  return (
    <div className="card p-0">
      <div className="p-4">
        <input
          placeholder="Search..."
          className="border p-2 w-full rounded dark:bg-gray-700"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              {columns.map((c) => (
                <th key={c} className="p-3 text-left">
                  {c}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((row, idx) => (
                <tr
                  key={idx}
                  className="even:bg-gray-50 odd:bg-white
                             dark:even:bg-gray-800 dark:odd:bg-gray-700
                             hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {columns.map((c) => (
                    <td key={c} className="p-3">
                      {row[c.toLowerCase()]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center">
                  No matching results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
