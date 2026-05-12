// import { useState } from "react";

// export default function RatingStars({ initial = 0, onChange }) {
//   const [value, setValue] = useState(initial);

//   const clickStar = (v) => {
//     setValue(v);
//     onChange(v);
//   };

//   return (
//     <div className="flex gap-1 cursor-pointer">
//       {[1,2,3,4,5].map((n) => (
//         <span
//           key={n}
//           onClick={() => clickStar(n)}
//           className={n <= value ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// }


export default function RatingStars({ value = 0, onChange }) {
  return (
    <div className="flex gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={() => onChange(n)}
          className={`text-xl transition ${
            n <= value ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
