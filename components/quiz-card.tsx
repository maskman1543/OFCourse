// import Link from "next/link";
// import { Quiz } from "@prisma/client"; // Assuming Quiz is a custom type representing quiz data


// interface QuizCardProps {
//   id: string;
//   title: string;
//   questions: string[]; // Array of question descriptions
//   correctAnswer: string; // Correct answer
// }

// export const QuizCard = ({ id, title, questions, correctAnswer }: QuizCardProps) => {
//   // Your component logic to render a quiz card based on the provided data
//   return (
//     <Link href={`/courses/${id}/quiz`}>
//       <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
//         <div className="flex flex-col pt-2">
//           <div className="my-3 text-sm md:text-xs">
//             <div className="mb-2">
//               <p className="font-semibold">{question || "What is the capital of France?"}</p>
//             </div>
//               {choices && choices.map((choice, index) => (
//                 <label key={index} className="flex items-center space-x-3 space-y-2 text-sm">
//                   <input
//                     type="radio"
//                     value={choice}
//                     name={`choice_${id}`}
//                   className="form-radio rounded"
//                 />
//                 <span>{choice}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };
