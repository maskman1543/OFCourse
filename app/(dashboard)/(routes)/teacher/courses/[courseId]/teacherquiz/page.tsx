"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import{
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Router } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "title is required"
  }),
  choices01: z.string().min(1, {
    message: "choices is required"
  }),
  choices02: z.string().min(1, {
    message: "choices is required"
  }),
  choices03: z.string().min(1, {
    message: "choices is required"
  }),
  choices04: z.string().min(1, {
    message: "choices is required"
  })
});

const CreateQuizPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title: "",
      choices01: "",
      choices02: "",
      choices03: "",
      choices04: "",
    },
  });

  const {isSubmitting, isValid} = form.formState;

  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   console.log(values);
  // }
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const response = await axios.post(`/api/courses/[courseId]/quiz`, values);
      router.push(`/teacher/courses/teacherquiz/${response.data.id}`); // it shoul put an error since there is no route for this
      toast.success("Quiz Created")
    }catch{
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your course
        </h1>
        <p className="text-sm text-slate-600">
          chuchutvasdasdasdasdasdasdada
        </p>
        <Form {...form}>
          <form
           onSubmit={form.handleSubmit(onSubmit)}
           className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Enter Question Here!
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'advance web dev"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="choices01"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Enter Choices Here
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'advance web dev"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="choices02"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Enter Choices Here
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'advance web dev"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="choices03"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Enter Choices Here
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'advance web dev"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="choices04"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Enter Choices Here
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'advance web dev"
                    {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button
                  type="button"
                  variant="ghost"
                  >
                    Cancel
                  </Button>
                </Link >
                <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                >
                  Continue
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateQuizPage;