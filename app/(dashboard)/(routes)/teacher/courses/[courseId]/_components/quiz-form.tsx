"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonQuiz } from "@/components/ui/quiz-button";


interface ChoiceFormShape {
  text: string;
  isCorrect: boolean;
}

interface QuestionFormShape {
  text: string;
  choices: ChoiceFormShape[];
}

interface QuizFormShape {
  title: string;
  questions: QuestionFormShape[];
}

interface QuizFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  questions: z.array(z.object({
    text: z.string().min(1, "Question text is required"),
    choices: z.array(z.object({
      text: z.string(),
      isCorrect: z.boolean(),
    })),
  })),
});

interface QuizFormProps {
  //initialData: QuizFormShape;
  courseId: string;
}

export const QuizForm = ({
  initialData,
  courseId
}: QuizFormProps) => {
  const router = useRouter();

  const form = useForm<QuizFormShape>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/quiz`, values);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const onEdit = (id: string) => {
      router.push(`/teacher/courses/${courseId}/teacherquiz/${id}`);
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between p-3">
      <p className="text-base"><b>OFCourse</b> recommends adding a quiz for this course, press the button below to edit the Quiz!</p>
      </div>
      
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <div className="flex items-center gap-x-1">
              <ButtonQuiz
                //disabled={!isValid || isSubmitting}
                type="submit"
                onEdit={onEdit}
                className="w-full px-6 py-6 text-lg"
              >
               <span className="text-base">Edit Course Quiz</span>
              </ButtonQuiz>
            </div>
          </form>
        </Form>
      
    </div>
  )
}