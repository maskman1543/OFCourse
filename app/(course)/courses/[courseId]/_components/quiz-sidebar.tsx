import { auth } from "@clerk/nextjs";
import { Quiz, Course} from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { CourseQuizSidebarItem } from "./course-quiz-sidebar";
import { CourseCertificationSidebar } from "./course-certification-sidebar";

interface CourseQuizProps {
  course: Course & {
    quizzes: (Quiz)[];
  };
};


export const QuizSidebar = async ({
  course,
}: CourseQuizProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // const quiz = await db.quiz.findUnique({
  //   where: {
  //     userId_courseId: { 
  //       userId: userId,
  //       courseId: course.id,
  //     },
  //   },
  // });

  const quizItems = course.quizzes.map((quiz) =>
    <CourseQuizSidebarItem
      key={quiz.id}
      id={quiz.id}
      label={quiz.title}
      courseId={course.id}
    />
  );
  

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="flex flex-col w-full">{quizItems}</div>
    </div>
  );
}