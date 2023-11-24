"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Chapter, Course, Quiz } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ChaptersList } from "./chapters-list";

interface QuizFormProps {
  initialData: Course & { quizzes: { id: string; title: string; description: string | null; score: number; createdAt: Date; updatedAt: Date }[] };
  courseId: string;
}
const formSchema = z.object({
  title: z.string().min(1),
});

export const QuizForm = ({ initialData, courseId }: QuizFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [questions, setQuestions] = useState<
    {
      questionTitle: string;
      questionDescription: string;
      score: number;
    }[]
  >([]);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const toggleAddingQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionTitle: "",
        questionDescription: "",
        score: 0,
      },
    ]);
  };

  const onRemoveQuestion = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const onQuestionChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      )
    );
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async () => {
    try {
      await axios.post(`/api/courses/${courseId}/quizzes`, {
        title: form.getValues("title"),
        questions,
      });

      toast.success("Quiz created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/quizzes/reorder`, {
        list: updateData,
      });
      toast.success("Quizzes reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/quizzes/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course quizzes
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a quiz
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the quiz'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {questions.map((question, index) => (
              <div key={index} className="space-y-4 mt-4">
                <Input
                  disabled={isSubmitting}
                  placeholder="Question title"
                  value={question.questionTitle}
                  onChange={(e) =>
                    onQuestionChange(index, "questionTitle", e.target.value)
                  }
                />
                <Input
                  disabled={isSubmitting}
                  placeholder="Question description"
                  value={question.questionDescription}
                  onChange={(e) =>
                    onQuestionChange(
                      index,
                      "questionDescription",
                      e.target.value
                    )
                  }
                />
                <Input
                  disabled={isSubmitting}
                  type="number"
                  placeholder="Score"
                  value={question.score}
                  onChange={(e) =>
                    onQuestionChange(
                      index,
                      "score",
                      parseInt(e.target.value, 10)
                    )
                  }
                />
                <Button
                  variant="ghost"
                  onClick={() => onRemoveQuestion(index)}
                >
                  Remove Question
                </Button>
              </div>
            ))}
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create Quiz
            </Button>
            <Button variant="ghost" onClick={toggleAddingQuestion}>
              Add Question
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <>
          {!initialData.quizzes || initialData.quizzes.length === 0 ? (
            <p className="text-sm mt-2 text-slate-500 italic">No quizzes</p>
          ) : (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.quizzes}
            />
          )}
          <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the quizzes
          </p>
        </>
      )}
    </div>
  );
};
