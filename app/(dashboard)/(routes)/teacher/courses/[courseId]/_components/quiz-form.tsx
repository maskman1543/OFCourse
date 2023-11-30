"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
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

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const QuizForm = ({
  initialData,
  courseId
}: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     await axios.patch(`/api/courses/${courseId}`, values);
  //     // toast.success("Course updated");
  //     // toggleEdit();
  //     router.refresh();
  //   } catch {
  //     toast.error("Something went wrong");
  //   }
  // }

  const onSubmit = () => {
    router.push(`/teacher/courses/${courseId}/teacherquiz`);
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between p-3">
        <p><b>OFCourse</b> recommends adding a quiz for this course, press the button below to edit the Quiz!</p>
      </div>
      
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <div className="flex items-center gap-x-1">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="w-full"
              >
                Edit Course Quiz
              </Button>
            </div>
          </form>
        </Form>
      
    </div>
  )
}