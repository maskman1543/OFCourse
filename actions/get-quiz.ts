
import { db } from "@/lib/db";
import { Quiz } from "@prisma/client";

interface GetQuizProps {
  userId: string;
  courseId: string;
  quizId: string;
  chapterId: string;
}

export const getQuiz = async ({
  userId,
  courseId,
  quizId,
}: GetQuizProps) => {
  try {
    // Assuming that `userId` and `courseId` are used just for validation and not for finding the quiz
    const quiz = await db.quiz.findUnique({
      where: {
        id: quizId, // Use quizId to uniquely identify the quiz
      },
      // If you need to include relations, uncomment the following:
      /*
      include: {
        questions: {
          include: {
            choices: true,
          },
        },
      },
      */
    });

    // Optional: Add additional checks if you need to validate ownership or course association
    if (quiz && quiz.courseId !== courseId) {
      // The quiz does not belong to the course provided
      console.log(`Quiz does not belong to course ${courseId}`);
      return { quiz: null };
    }

    return { quiz, };
  } catch (error) {
    console.log("[GET_QUIZ]", error);
    return { quiz: null };
  }
}
