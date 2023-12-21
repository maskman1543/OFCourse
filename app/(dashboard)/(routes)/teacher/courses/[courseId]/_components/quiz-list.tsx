"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

  interface QuizListProps {
    items: {id: string;
        title: string;
        courseId: string;
        score: number | null;
        isPublished: boolean;

        question01: string;
        choices01A: string;
        choices01B: string;
        choices01C: string;
        choices01D: string;
        correctAnswer01: string;
    
        question02: string;
        choices02A: string;
        choices02B: string;
        choices02C: string;
        choices02D: string;
        correctAnswer02: string;
    
        question03: string;
        choices03A: string;
        choices03B: string;
        choices03C: string;
        choices03D: string;
        correctAnswer03: string;
    
        question04: string;
        choices04A: string;
        choices04B: string;
        choices04C: string;
        choices04D: string;
        correctAnswer04: string;
    
        question05: string;
        choices05A: string;
        choices05B: string;
        choices05C: string;
        choices05D: string;
        correctAnswer05: string;
      
        createdAt: Date;
        updatedAt: Date}[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
  }
  
  export const QuizList = ({
    items,
    onEdit
  }: QuizListProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [quizzes, setQuizzes] = useState(items);
    
    useEffect(() => {
        setIsMounted(true);
      }, []);
    
      useEffect(() => {
        setQuizzes(items);
      }, [items]);

      
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(quizzes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setQuizzes(items);

    const bulkUpdateData = updatedChapters.map((quiz) => ({
      id: quiz.id,
      position: items.findIndex((item) => item.id === quiz.id)
    }));

    onReorder(bulkUpdateData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {quizzes.map((quiz, index) => (
              <Draggable 
                key={quiz.id} 
                draggableId={quiz.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      quiz.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        quiz.isPublished && "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip
                        className="h-5 w-5"
                      />
                    </div>
                    {quiz.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          quiz.isPublished && "bg-sky-700"
                        )}
                      >
                        {quiz.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(quiz.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

function onReorder(bulkUpdateData: { id: string; position: number; }[]) {
    throw new Error("Function not implemented.");
}
