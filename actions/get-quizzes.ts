import { Quiz, Course, Question } from "@prisma/client";
import { db } from "@/lib/db";

type QuizWithQuestionsAndCourse = Quiz & {
  course: Course | null;
  questions: Question[];
};

type GetQuizzes = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getQuizzes = async ({
  userId,
  title,
  categoryId,
}: GetQuizzes): Promise<QuizWithQuestionsAndCourse[]> => {
  try {
    const quizzes = await db.quiz.findMany({
      where: {
        title: {
          contains: title,
        },
        course: {
          isPublished: true,
          category: {
            id: categoryId || undefined,
          },
        },
      },
      include: {
        course: {
          include: {
            category: true,
          },
        },
        questions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const quizzesWithCourseAndQuestions: QuizWithQuestionsAndCourse[] =
      await Promise.all(
        quizzes.map(async (quiz) => {
          const course = await db.course.findUnique({
            where: {
              id: quiz.courseId,
            },
          });

          if (!course) {
            return {
              ...quiz,
              course: null,
              questions: [],
            };
          }

          return {
            ...quiz,
            course,
          };
        })
      );

    return quizzesWithCourseAndQuestions;
  } catch (error) {
    console.error("[GET_QUIZZES]", error);
    return [];
  }
};
