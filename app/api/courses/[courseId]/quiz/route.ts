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

        const courseId = '3c609a33-366c-4716-87ab-6232141bc6a9';

        // Check if the course with the given courseId exists
        const existingCourse = await db.course.findUnique({
            where: {
                id: courseId,
            },
        });

        if (!existingCourse) {
            return new NextResponse("Course not found", { status: 404 });
        }

        // Find the associated quiz instead of creating a new one
        const existingQuiz = await db.quiz.findUnique({
            where: {
                id: existingCourse.id, // Use the course id as the quiz id
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