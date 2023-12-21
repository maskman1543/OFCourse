import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth(); // Ensure this is awaited if auth() is asynchronous
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quiz = await db.quiz.create({
      data: {
        title: "QUIZ",
        courseId: params.courseId,
        question01: "Default Question 1",
        choices01A: "Choice A",
        choices01B: "Choice B",
        choices01C: "Choice C",
        choices01D: "Choice D",
        correctAnswer01: "A",
        question02: "Default Question 1",
        choices02A: "Choice A",
        choices02B: "Choice B",
        choices02C: "Choice C",
        choices02D: "Choice D",
        correctAnswer02: "A",
        question03: "Default Question 1",
        choices03A: "Choice A",
        choices03B: "Choice B",
        choices03C: "Choice C",
        choices03D: "Choice D",
        correctAnswer03: "A",
        question04: "Default Question 1",
        choices04A: "Choice A",
        choices04B: "Choice B",
        choices04C: "Choice C",
        choices04D: "Choice D",
        correctAnswer04: "A",
        question05: "Default Question 1",
        choices05A: "Choice A",
        choices05B: "Choice B",
        choices05C: "Choice C",
        choices05D: "Choice D",
        correctAnswer05: "A",
      }
    });



    return NextResponse.json(quiz);
  } catch (error) {
    console.error("[QUIZ CREATION ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
