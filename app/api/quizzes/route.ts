// Import necessary modules
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import axios from "axios"; // Import axios for making HTTP requests
import toast from "react-hot-toast";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { question_01, choices, correctChoice } = await req.json();

        // Log the input to the terminal
        console.log("User ID:", userId);
        console.log("Received Data:", { question_01, choices, correctChoice });

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseId = '1d0b8170f-f18b-48cb-93e5-3ddb4ddd607d';

        const quiz = await db.quiz.create({
            data: {
                userId: 'your_user_id_here',
                courseId: courseId,
                title: 'Your Quiz Title',
              },
          });

        if (!existingQuiz) {
            return new NextResponse("Quiz not found", { status: 404 });
        }

        // Log the found quiz to the terminal
        console.log("Existing Quiz:", existingQuiz);

        // Use axios to make an HTTP POST request to your quiz route
        const response = await axios.post(`/api/courses/${courseId}/quiz`, {
            id: existingQuiz.id,
            // Include any other necessary data
        });

        // Log the response to the terminal
        console.log("HTTP POST Response:", response);

        // Adjust the routing based on your application structure
        return NextResponse.redirect(`/teacher/courses/teacherquiz/${existingQuiz.id}`);

    } catch (error) {
        console.error("Error processing the request:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}