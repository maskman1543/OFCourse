import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress, Quiz } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
//import { CourseQuizSidebar } from "./course-quiz-sidebar";
import { CourseCertificationSidebar } from "./course-certification-sidebar";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];}
  progressCount: number;
}

export const CourseSidebar = async ({
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
      },
    },
  });

  let quizRendered = false; // Flag for rendering the Quiz sidebar only once
  let certificationRendered = false; // Flag for rendering the Certification sidebar only once

  const courseSidebarItems = course.chapters.map((chapter) => (
    <CourseSidebarItem
      key={chapter.id}
      id={chapter.id}
      label={chapter.title}
      isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
      courseId={course.id}
      isLocked={!chapter.isFree && !purchase}
    />
  ));
  // Render Quiz sidebar if not rendered yet
  

  // Render Certification sidebar if not rendered yet
  if (!certificationRendered) {
    courseSidebarItems.push(
      <CourseCertificationSidebar
        key="certification"
        label="Certification" // Provide label or title for the certification sidebar
        id="certification" // Provide an ID for the certification sidebar
        //isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
      courseId={course.id}
      //isLocked={!chapter.isFree && !purchase}
      />
    );

    certificationRendered = true; // Set flag to avoid rendering multiple certifications
  }

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        <div className="mt-10">
          <CourseProgress variant="success" value={progressCount} />
        </div>
      </div>
      <div className="flex flex-col w-full">{courseSidebarItems}</div>
    </div>
  );
};
