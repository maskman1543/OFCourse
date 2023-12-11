import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try{
        const {userId} = auth();
        const { title } = await req.json();


        if (!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const courseId = '1d0b8170f-f18b-48cb-93e5-3ddb4ddd607d';

        const quiz = await db.quiz.create({
            data: {
                userId: 'your_user_id_here',
                courseId: courseId,
                title: 'Your Quiz Title',
              },
          });

          return NextResponse.json(quiz);
          
    }catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}