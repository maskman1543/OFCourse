import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";


export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    });

    if (!ownCourse) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
      const chapter = await db.chapter.findUnique({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        }
      });
  
      if (!chapter) {
        return new NextResponse("Not Found", { status: 404 });
      }

      const newQuiz = await db.quiz.create({
        data: {
          courseId: params.courseId,
          title: values.title,
          isPublished: false, // Assuming a new quiz is not published by default
          question01: values.question01,
          choices01A: values.choices01A,
          choices01B: values.choices01B,
          choices01C: values.choices01C,
          choices01D: values.choices01D,
          correctAnswer01: values.correctAnswer01,
          question02: values.question02,
          choices02A: values.choices02A,
          choices02B: values.choices02B,
          choices02C: values.choices02C,
          choices02D: values.choices02D,
          correctAnswer02: values.correctAnswer02,
          question03: values.question03,
          choices03A: values.choices03A,
          choices03B: values.choices03B,
          choices03C: values.choices03C,
          choices03D: values.choices03D,
          correctAnswer03: values.correctAnswer03,
          question04: values.question04,
          choices04A: values.choices04A,
          choices04B: values.choices04B,
          choices04C: values.choices04C,
          choices04D: values.choices04D,
          correctAnswer04: values.correctAnswer04,
          question05: values.question05,
          choices05A: values.choices05A,
          choices05B: values.choices05B,
          choices05C: values.choices05C,
          choices05D: values.choices05D,
          correctAnswer05: values.correctAnswer05,
        },
      });
      
      
    

    return NextResponse.json(newQuiz);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}