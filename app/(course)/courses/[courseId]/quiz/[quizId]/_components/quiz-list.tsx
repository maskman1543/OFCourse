// import { Category, Course, Quiz } from "@prisma/client";
// import { QuizCard } from "@/components/quiz-card";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface quizProp {
//   id: string;
//   title: string;
//   questions: string[]; // Assuming questions is an array of question descriptions
//   correctAnswer: string; // Assuming correctAnswer is the correct choice
//   // Other properties...
// }

// interface QuizListProps {
//   quizzes: quizProp [];
// }

// export const QuizList = ({ quizzes }: QuizListProps) => {
//   const [fetchedQuizzes, setFetchedQuizzes] = useState<Quiz[]>([]);

//   // Fetch quizzes from the API or any other source
//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const fetchedQuizzesData = await axios.get<Quiz[]>('api/quizzes');
//         setFetchedQuizzes(fetchedQuizzesData.data);
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };

//     fetchQuizzes();
//   }, []);

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 space-x-1 ">
//         {quizzes.map((quiz) => (
//           <QuizCard
//             key={quiz.id}
//             id={quiz.id}
//             title={quiz.title}
//             questions={quiz.questions} // Assuming questions is an array of question descriptions
//             correctAnswer={quiz.correctAnswer} // Assuming correctAnswer is the correct choice
//           />
//         ))}
//       </div>
//       {quizzes.length === 0 && (
//         <div className="text-center text-sm text-muted-foreground mt-10">
//           No Quiz found
//         </div>
//       )}
//     </div>
//   );
// };
