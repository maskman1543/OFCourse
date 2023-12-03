import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";
import { QuizCard } from "@/components/quiz-card";
import { Button } from "@/components/ui/button";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const QuizList = ({ items }: CoursesListProps) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 space-x-1 ">
          {items.map((item) => (
            <QuizCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl!}
              chaptersLength={item.chapters.length}
              //price={item.price!}
              progress={item.progress}
              category={item?.category?.name!}
            />
          ))}
          
        </div>
        {items.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No Quiz found
          </div>
        )}
        
      </div>
    );
  };