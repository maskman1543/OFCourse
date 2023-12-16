// "use client";
// import React from 'react';
// import { Question } from "@prisma/client"; // Update the path to your Question model

// interface QuestionCardProps {
//   question: Question;
// }

// const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
//   return (
//     <div className="bg-white p-4 shadow-md rounded-md mb-4">
//       <h3 className="text-lg font-semibold mb-2">{question.questionDescription}</h3>
//       <p className="text-gray-600 mb-2">{question.choices}</p>

//       {/* Radio buttons for selecting the correct answer */}
//       <div className="flex items-center mb-4">
//         <input
//           type="radio"
//           id={`correctAnswer_${question.id}`}
//           name={`correctAnswer_${question.id}`}
//           value={question.choices} // You may need to adjust this based on your data structure
//           // Add any other attributes or event handlers you need
//         />
//         <label htmlFor={`correctAnswer_${question.id}`} className="ml-2">Correct Answer</label>
//       </div>

//       {/* Add any other question details you want to display */}
//     </div>
//   );
// };

// export default QuestionCard;