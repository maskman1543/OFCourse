// import { Quiz } from "@prisma/client";
// import { useEffect, useState } from "react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";
// import { Grip, Pencil } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";

// interface QuizListProps {
//   items: Quiz[]; // Replace with your actual type for quizzes
//   onReorder: (updateData: { id: string; position: number }[]) => void;
//   onEdit: (id: string) => void;
// }

// export const QuizList = ({
//   items,
//   onReorder,
//   onEdit
// }: QuizListProps) => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [quizzes, setQuizzes] = useState(items);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     setQuizzes(items);
//   }, [items]);

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     const updatedQuizzes = Array.from(quizzes);
//     const [reorderedItem] = updatedQuizzes.splice(result.source.index, 1);
//     updatedQuizzes.splice(result.destination.index, 0, reorderedItem);

//     setQuizzes(updatedQuizzes);

//     const bulkUpdateData = updatedQuizzes.map((quiz) => ({
//       id: quiz.id,
//       position: updatedQuizzes.findIndex((item) => item.id === quiz.id)
//     }));

//     onReorder(bulkUpdateData);
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="quizzes">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {quizzes.map((quiz, index) => (
//               <Draggable
//                 key={quiz.id}
//                 draggableId={quiz.id}
//                 index={index}
//               >
//                 {(provided) => (
//                   <div
//                     className={cn(
//                       "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm"
//                     )}
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                   >
//                     <div
//                       className={cn(
//                         "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
//                       )}
//                       {...provided.dragHandleProps}
//                     >
//                       <Grip
//                         className="h-5 w-5"
//                       />
//                     </div>
//                     {quiz.title}
//                     <div className="ml-auto pr-2 flex items-center gap-x-2">
//                       <Pencil
//                         onClick={() => onEdit(quiz.id)}
//                         className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
//                       />
//                     </div>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };
