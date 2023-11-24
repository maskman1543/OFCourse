import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseQuizSidebar } from "./course-quiz-sidebar";
import { CourseCertificationSidebar } from "./course-certification-sidebar";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;
};

export const QuizSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      }
    }
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      {/* THIS IS WHERE YOU WILL ADD THE CERTIFICATE AND QUIZ */}
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="flex flex-col w-full">
        {course.chapters && course.chapters.length > 0 && (
          <CourseQuizSidebar
            key={course.chapters[0].id}
            id={course.chapters[0].id}
            label={course.chapters[0].title}
            //isCompleted={!!course.chapters[0].userProgress?.[0]?.isCompleted}
            courseId={course.id}
            //isLocked={!course.chapters[0].isFree && !purchase}
          />
        )}
      </div>
    </div>
    </div>
  )
}